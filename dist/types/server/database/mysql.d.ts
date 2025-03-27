import { Connection, RowDataPacket, ResultSetHeader } from 'mysql2/promise.js';
export type typeMySqlDb = mysqlDb;
declare class mysqlDb {
    private database;
    constructor(database: Connection);
    getCode(email: string): Promise<RowDataPacket | undefined>;
    createCode(email: string): Promise<ResultSetHeader | undefined>;
    findUser(email: string): Promise<RowDataPacket | undefined>;
    createUser(email: string, password: string, userName?: string, image?: string): Promise<ResultSetHeader | undefined>;
    deleteUser(email: string, password: string): Promise<ResultSetHeader | undefined>;
    updateUser(email: string, password: string, newEmail?: string, newPassword?: string, userName?: string, image?: string): Promise<ResultSetHeader | undefined>;
}
export default function simpliMysql(database: Connection): mysqlDb;
export {};
