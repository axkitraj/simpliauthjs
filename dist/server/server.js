import axios from "axios";
import express from "express";
import { magicLinkTemplate, otpTemplate, alertChangeTemplate, welcomeTemplate } from '../lib/template/email.js';
import { generateUserResponse, generateTokenResponse, verifyHashPassword, generateHashPassword, generateJwtToken, verifyJwtToken, formateDate } from "../lib/index.js";
export default class SimpliAuthServer {
    constructor(clientUrl, serverUrl, redirectUrl, mailer, database, jwtSecret, jwtExpireIn, cookieName, socialProvider) {
        this.clientUrl = clientUrl;
        this.serverUrl = serverUrl;
        this.redirectUrl = redirectUrl;
        this.mailer = mailer;
        this.database = database;
        this.jwtSecret = jwtSecret;
        this.jwtExpireIn = jwtExpireIn;
        this.cookieName = cookieName;
        this.socialProvider = socialProvider;
        if (!clientUrl || !serverUrl || !redirectUrl || !jwtSecret || !jwtExpireIn || !mailer || !database) {
            throw new Error('All required arguments must be provided.'.red);
        }
    }
    oauthRedirect(req, res, provider) {
        if (!provider) {
            return res.status(400).json({ message: `${provider} OAuth configuration is missing.` });
        }
        let authURL = "";
        switch (provider) {
            case "google":
                authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.socialProvider?.Google.clientId}&redirect_uri=${this.serverUrl}/google/callback&response_type=code&scope=email profile`;
                break;
            case "github":
                authURL = `https://github.com/login/oauth/authorize?client_id=${this.socialProvider?.Github.clientId}&scope=user:email`;
                break;
            default:
                return res.status(400).json({
                    token: undefined, error: {
                        error: true,
                        message: `Unsupported provider: ${provider}`
                    }
                });
        }
        res.redirect(authURL);
    }
    async handleOAuthCallback(req, res, provider) {
        const { code } = req.query;
        const { clientId, clientSecret, tokenUrl, userInfoUrl, cookieName } = provider;
        try {
            const { data } = await axios.post(tokenUrl, {
                client_id: clientId,
                client_secret: clientSecret,
                code,
                grant_type: "authorization_code",
                redirect_uri: `${this.serverUrl}/${provider.name}/callback`,
            }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
            const { data: userInfo } = await axios.get(userInfoUrl, {
                headers: { Authorization: `Bearer ${data.access_token}` },
            });
            if (!userInfo.email) {
                throw new Error(`${provider.name} account email not found.`.red);
            }
            const token = generateJwtToken(userInfo.email, this.jwtSecret, { expiresIn: this.jwtExpireIn });
            res.cookie(cookieName, token, { httpOnly: true, secure: true, sameSite: "strict" });
            res.redirect(this.redirectUrl);
        }
        catch (error) {
            console.log(`Error! ${provider?.name} authentication failed.`.red, error);
            res.status(400).json({
                token: undefined, error: {
                    error: true,
                    message: `Error! ${provider?.name} authentication failed.`
                }
            });
        }
    }
    route() {
        const router = express.Router();
        router
            .get('/user', async (req, res) => {
            try {
                let email = '';
                const reqToken = req.headers.authorization?.split(' ')[1];
                const reqCookie = req.headers.cookie;
                if (reqToken) {
                    const verifyToken = verifyJwtToken(reqToken, this.jwtSecret);
                    if (verifyToken.error) {
                        const verifyTokenError = generateTokenResponse(true, 'Unauthorized! Please logged in.');
                        res.status(401).send(verifyTokenError);
                    }
                    email = verifyToken.id;
                }
                else if (reqCookie) {
                    const verifyToken = verifyJwtToken(reqCookie, this.jwtSecret);
                    if (verifyToken.error) {
                        const verifyTokenError = generateTokenResponse(true, 'Unauthorized! Please logged in.');
                        res.status(401).send(verifyTokenError);
                    }
                    email = verifyToken.id;
                }
                else {
                    const verifyTokenError = generateTokenResponse(true, 'Unauthorized! Please logged in.');
                    res.status(401).send(verifyTokenError);
                }
                const resUser = await this.database.findUser(email);
                if (!resUser) {
                    const userError = generateTokenResponse(true, 'Please create account for updating profile.');
                    res.status(404).send(userError);
                }
                const user = {
                    userName: resUser?.userName,
                    joined: resUser?.joined,
                    email: resUser?.email,
                    image: resUser?.image,
                };
                const response = generateUserResponse(false, `Success! getting ${user.email} account data.`, user);
                res.status(200).send(response);
            }
            catch (error) {
                console.log('Error: unknown error'.red, error);
                const serverError = generateTokenResponse(true, 'Server Error! Please try again later');
                res.status(500).send(serverError);
            }
        })
            .put('/update', async (req, res) => {
            const { email, password, newEmail, newPassword, verificationCode, userName, image } = req.body;
            try {
                const resCode = await this.database.getCode(email);
                if (!resCode) {
                    const codeError = generateTokenResponse(true, 'Cannot verify your email. Please try again later.');
                    res.status(403).send(codeError);
                }
                const isVerified = (verificationCode === resCode?.code);
                if (!isVerified) {
                    const verificationError = generateTokenResponse(true, 'Verification code not match.');
                    res.status(400).send(verificationError);
                }
                const resUser = await this.database.findUser(email);
                if (!resUser) {
                    const userError = generateTokenResponse(true, 'Please create account for updating profile.');
                    res.status(404).send(userError);
                }
                const isMatch = verifyHashPassword(password, resUser?.password);
                if (!isMatch) {
                    const validationError = generateTokenResponse(true, 'Please enter a valid email and password.');
                    res.status(401).send(validationError);
                }
                let hashPassword = '';
                if (newPassword) {
                    hashPassword = await generateHashPassword(newPassword);
                }
                const updateUser = await this.database.updateUser(email, password, newEmail, hashPassword, userName, image);
                if (!updateUser) {
                    const updatingError = generateTokenResponse(true, 'Account creation failed.');
                    res.status(500).send(updatingError);
                }
                const change = newEmail ? 'Email' : newPassword ? 'Password' : 'Profile';
                if (change === 'Profile') {
                    const response = generateTokenResponse(false, 'Profile update successfully.');
                    res.status(200).send(response);
                }
                await this.mailer.SendGmail(1, email, `${change} Change Notification`, '', alertChangeTemplate(this.mailer.getSender(), change, formateDate(new Date()), userName));
                const emailError = generateTokenResponse(true, `${change} is changed successfully.`);
                res.status(200).send(emailError);
            }
            catch (error) {
                console.log('Error: unknown error'.red, error);
                const serverError = generateTokenResponse(true, 'Server Error! Please try again later');
                res.status(500).send(serverError);
            }
        })
            .post('/signin', async (req, res) => {
            const { email, password, verificationCode } = req.body;
            try {
                const resCode = await this.database.getCode(email);
                if (!resCode) {
                    const codeError = generateTokenResponse(true, 'Cannot verify your email. Please try again later.');
                    res.status(403).send(codeError);
                }
                const isVerified = (verificationCode === resCode?.code);
                if (!isVerified) {
                    const verificationError = generateTokenResponse(true, 'Verification code not match.');
                    res.status(400).send(verificationError);
                }
                const resUser = await this.database.findUser(email);
                if (!resUser) {
                    const userError = generateTokenResponse(true, 'Please create account before signin.');
                    res.status(404).send(userError);
                }
                const isMatch = verifyHashPassword(password, resUser?.password);
                if (!isMatch) {
                    const validationError = generateTokenResponse(true, 'Please enter a valid email and password.');
                    res.status(401).send(validationError);
                }
                const token = generateJwtToken({ id: email }, this.jwtSecret, { expiresIn: this.jwtExpireIn });
                const response = generateTokenResponse(false, 'Successfully logged in.', token);
                res.status(200).send(response);
            }
            catch (error) {
                console.log('Error: unknown error'.red, error);
                const serverError = generateTokenResponse(true, 'Server Error! Please try again later');
                res.status(500).send(serverError);
            }
        })
            .post('/magic-signin', async (req, res) => {
            const { email, password } = req.body;
            try {
                const resUser = await this.database.findUser(email);
                if (!resUser) {
                    const userError = generateTokenResponse(true, 'Please create account before signin.');
                    res.status(404).send(userError);
                }
                const isMatch = verifyHashPassword(password, resUser?.password);
                if (!isMatch) {
                    const validationError = generateTokenResponse(true, 'Please enter a valid email and password.');
                    res.status(401).send(validationError);
                }
                const token = generateJwtToken({ id: email }, this.jwtSecret, { expiresIn: this.jwtExpireIn });
                const magicLink = `${this.clientUrl}/auth?token=${token}`;
                const info = await this.mailer.SendGmail(1, email, 'Signin with Magic link', '', magicLinkTemplate(this.mailer.getSender(), magicLink, resUser?.userName));
                if (!info) {
                    const emailError = generateTokenResponse(true, 'Failed to send email. Please try again later.');
                    res.status(500).send(emailError);
                }
                const response = generateTokenResponse(false, 'Magic link sent.');
                res.status(200).send(response);
            }
            catch (error) {
                console.log('Error: unknown error'.red, error);
                const serverError = generateTokenResponse(true, 'Server Error! Please try again later');
                res.status(500).send(serverError);
            }
        })
            .post('/signup', async (req, res) => {
            const { email, password, verificationCode, userName, image } = req.body;
            try {
                const resCode = await this.database.getCode(email);
                if (!resCode) {
                    const codeError = generateTokenResponse(true, 'Cannot verify your email. Please try again later.');
                    res.status(403).send(codeError);
                }
                const isVerified = (verificationCode === resCode?.code);
                if (!isVerified) {
                    const verificationError = generateTokenResponse(true, 'Verification code not match.');
                    res.status(400).send(verificationError);
                }
                const resUser = await this.database.findUser(email);
                if (resUser) {
                    const userError = generateTokenResponse(true, 'Please signin, account already exist.');
                    res.status(400).send(userError);
                }
                const hashPassword = await generateHashPassword(password);
                const createUser = await this.database.createUser(email, hashPassword, userName, image);
                if (!createUser) {
                    const creationError = generateTokenResponse(true, 'Account creation failed.');
                    res.status(500).send(creationError);
                }
                await this.mailer.SendGmail(1, email, `Welcome ${userName}`, '', welcomeTemplate(this.mailer.getSender(), this.clientUrl, userName));
                const token = generateJwtToken({ id: email }, this.jwtSecret, { expiresIn: this.jwtExpireIn });
                const response = generateTokenResponse(false, 'Account created.', token);
                res.status(201).send(response);
            }
            catch (error) {
                console.log('Error: unknown error'.red, error);
                const serverError = generateTokenResponse(true, 'Server Error! Please try again later');
                res.status(500).send(serverError);
            }
        })
            .post('/email-validation', async (req, res) => {
            const { email } = req.body;
            try {
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                const resCode = await this.database.createCode(email);
                if (!resCode) {
                    const creationError = generateTokenResponse(true, 'Failed to create code. Please try again later.');
                    res.status(500).send(creationError);
                }
                const info = await this.mailer.SendGmail(1, email, 'Email Verification', '', otpTemplate(this.mailer.getSender(), code));
                if (!info) {
                    const emailError = generateTokenResponse(true, 'Failed to send email. Please try again later.');
                    res.status(500).send(emailError);
                }
                const response = generateTokenResponse(false, 'Verification code sent.');
                res.status(200).send(response);
            }
            catch (error) {
                console.log('Error: unknown error'.red, error);
                const serverError = generateTokenResponse(true, 'Server Error! Please try again later');
                res.status(500).send(serverError);
            }
        })
            .get("/google", (req, res) => {
            this.oauthRedirect(req, res, "Google");
        })
            .get("/google/callback", (req, res) => {
            const googleProvider = {
                name: 'google',
                clientId: this.socialProvider?.Google.clientId,
                clientSecret: this.socialProvider?.Google.clientSecret,
                tokenUrl: "https://oauth2.googleapis.com/token",
                userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
                scope: 'email profile',
                cookieName: `${this.cookieName}_google`,
            };
            this.handleOAuthCallback(req, res, googleProvider);
        })
            .get("/github", (req, res) => {
            this.oauthRedirect(req, res, "Github");
        })
            .get("/github/callback", (req, res) => {
            const githubProvider = {
                name: 'github',
                clientId: this.socialProvider?.Github.clientId,
                clientSecret: this.socialProvider?.Github.clientSecret,
                tokenUrl: "https://github.com/login/oauth/access_token",
                userInfoUrl: "https://api.github.com/user",
                scope: 'user:email',
                cookieName: `${this.cookieName}_github`,
            };
            this.handleOAuthCallback(req, res, githubProvider);
        });
        return router;
    }
}
