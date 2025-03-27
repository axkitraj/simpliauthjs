import { typeMailer } from "../server/mailer.js";
import { typeMySqlDb } from "../server/database/mysql.js";
import { SignOptions } from "jsonwebtoken";
export type SocialProvider = {
    Google: {
        clientId: string;
        clientSecret: string;
    };
    Github: {
        clientId: string;
        clientSecret: string;
    };
    Facebook: {
        clientId: string;
        clientSecret: string;
    };
};
export default class SimpliAuthServer {
    private clientUrl;
    private serverUrl;
    private redirectUrl;
    private mailer;
    private database;
    private jwtSecret;
    private jwtExpireIn;
    private cookieName?;
    private socialProvider?;
    constructor(clientUrl: string, serverUrl: string, redirectUrl: string, mailer: typeMailer, database: typeMySqlDb, jwtSecret: string, jwtExpireIn: SignOptions['expiresIn'], cookieName?: string | undefined, socialProvider?: SocialProvider | undefined);
    private oauthRedirect;
    private handleOAuthCallback;
    route(): import("express-serve-static-core").Router;
}
