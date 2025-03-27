import { Pool, QueryResult } from 'pg';
export type TypePostgresDb = PostgresDb;
declare class PostgresDb {
    private database;
    constructor(database: Pool);
    getCode(email: string): Promise<any | undefined>;
    createCode(email: string): Promise<QueryResult | undefined>;
    findUser(email: string): Promise<any | undefined>;
    createUser(email: string, password: string, userName?: string, image?: string): Promise<QueryResult | undefined>;
    deleteUser(email: string, password: string): Promise<QueryResult | undefined>;
    updateUser(email: string, password: string, newEmail?: string, newPassword?: string, userName?: string, image?: string): Promise<QueryResult | undefined>;
}
export default function simpliPostgres(database: Pool): PostgresDb;
export {};
