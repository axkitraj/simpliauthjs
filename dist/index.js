import SimpliAuthClient from "./client/client.js";
import SimpliAuthServer from "./server/server.js";
import simpliMysql from "./server/database/mysql.js";
import simpliMailer from "./server/mailer.js";
class SimpliAuth {
    client(serverUrl, tokenName) {
        return new SimpliAuthClient(serverUrl, tokenName);
    }
    server(clientUrl, serverUrl, redirectUrl, mailer, database, jwtSecret, jwtExpireIn, cookieName, socialProvider) {
        return new SimpliAuthServer(clientUrl, serverUrl, redirectUrl, mailer, database, jwtSecret, jwtExpireIn, cookieName, socialProvider);
    }
}
const simpliauth = new SimpliAuth();
export default simpliauth;
export { simpliMailer, simpliMysql };
