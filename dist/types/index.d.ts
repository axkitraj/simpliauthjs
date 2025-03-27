import SimpliAuthClient from "./client/client.js";
import SimpliAuthServer, { SocialProvider } from "./server/server.js";
import { SignOptions } from "jsonwebtoken";
import simpliMysql, { TypeMySqlDb } from "./server/database/mysql.js";
import simpliMongoDb, { TypeMongoDb } from "./server/database/mongo.js";
import simpliPostgres, { TypePostgresDb } from "./server/database/postgres.js";
import simpliMailer, { TypeMailer } from "./server/mailer.js";
declare class SimpliAuth {
    client(serverUrl: string, tokenName: string): SimpliAuthClient;
    server(clientUrl: string, serverUrl: string, redirectUrl: string, mailer: TypeMailer, database: TypeMySqlDb | TypePostgresDb | TypeMongoDb, jwtSecret: string, jwtExpireIn: SignOptions['expiresIn'], cookieName?: string, socialProvider?: SocialProvider): SimpliAuthServer;
}
declare const simpliauth: SimpliAuth;
export default simpliauth;
export { simpliMailer, simpliMysql, simpliPostgres, simpliMongoDb };
