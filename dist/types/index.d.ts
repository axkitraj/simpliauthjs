import SimpliAuthClient from "./client/client.js";
import SimpliAuthServer, { SocialProvider } from "./server/server.js";
import { SignOptions } from "jsonwebtoken";
import simpliMysql, { typeMySqlDb } from "./server/database/mysql.js";
import simpliMailer, { typeMailer } from "./server/mailer.js";
declare class SimpliAuth {
    client(serverUrl: string, tokenName: string): SimpliAuthClient;
    server(clientUrl: string, serverUrl: string, redirectUrl: string, mailer: typeMailer, database: typeMySqlDb, jwtSecret: string, jwtExpireIn: SignOptions['expiresIn'], cookieName?: string, socialProvider?: SocialProvider): SimpliAuthServer;
}
declare const simpliauth: SimpliAuth;
export default simpliauth;
export { simpliMailer, simpliMysql };
