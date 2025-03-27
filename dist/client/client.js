import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default class SimpliAuthClient {
    constructor(serverUrl, tokenName) {
        this.serverUrl = serverUrl;
        this.tokenName = tokenName;
        if (!serverUrl || !tokenName) {
            throw new Error('Server url and token name is required.'.red);
        }
    }
    async handleRequest(method, endPoint, data, authorization) {
        try {
            const response = await axios({
                method, url: `${this.serverUrl}/${endPoint}`, data, headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authorization}`
                }
            });
            const { user, token, error } = response.data;
            return { user, token, error };
        }
        catch (error) {
            const errorMessage = error.response?.data?.message;
            return {
                error: {
                    error: true,
                    message: errorMessage,
                }
            };
        }
    }
    SignOut() {
        localStorage.removeItem(this.tokenName);
    }
    IsAuthenticated() {
        const token = localStorage.getItem(this.tokenName) || '';
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp) {
            return decoded.exp > currentTime;
        }
        return false;
    }
    async AuthUser() {
        const token = localStorage?.getItem(this.tokenName);
        return this.handleRequest('GET', 'user', {}, token);
    }
    async SignIn(email, password, verificationCode) {
        return this.handleRequest('POST', 'signin', { email, password, verificationCode });
    }
    async SignInWithMagicLink(email) {
        return this.handleRequest('POST', 'magic-signin', { email });
    }
    async SocialSignInWith(provider) {
        return this.handleRequest('GET', provider, {});
    }
    async SignUp(email, password, verificationCode, userName, image) {
        return this.handleRequest('POST', 'signup', { email, password, verificationCode, userName, image });
    }
    async SocialSignUpWith(provider) {
        return this.handleRequest('GET', provider, {});
    }
    async UpdateAuthUser(password, newEmail, newPassword, userName, image) {
        const token = localStorage?.getItem(this.tokenName);
        return this.handleRequest('PUT', 'update', { password, newEmail, newPassword, userName, image }, token);
    }
}
