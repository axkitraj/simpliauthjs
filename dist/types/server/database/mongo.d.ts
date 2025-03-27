import { Db } from 'mongodb';
export type TypeMongoDb = MongoDb;
declare class MongoDb {
    private database;
    private codeCollection;
    private authCollection;
    constructor(database: Db);
    getCode(email: string): Promise<any | undefined>;
    createCode(email: string): Promise<any | undefined>;
    findUser(email: string): Promise<any | undefined>;
    createUser(email: string, password: string, userName?: string, image?: string): Promise<any | undefined>;
    deleteUser(email: string, password: string): Promise<any | undefined>;
    updateUser(email: string, password: string, newEmail?: string, newPassword?: string, userName?: string, image?: string): Promise<any | undefined>;
}
export default function simpliMongoDb(database: Db): MongoDb;
export {};
