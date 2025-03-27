import jwt from "jsonwebtoken";
export declare function formateDate(date: any): string;
export declare function generateUserResponse(error: boolean, message: string, user?: object): {
    user: object | undefined;
    error: {
        error: boolean;
        message: string;
    };
};
export declare function generateTokenResponse(error: boolean, message: string, token?: string): {
    token: string | undefined;
    error: {
        error: boolean;
        message: string;
    };
};
export declare function verifyHashPassword(inputPassword: string, storedPassword: string): Promise<boolean>;
export declare function generateHashPassword(password: string): Promise<string>;
type jwtPayload = string | Buffer | object;
type jwtSecret = jwt.Secret | jwt.PrivateKey;
export declare function generateJwtToken(payload: jwtPayload, jwtSecret: jwtSecret, options: jwt.SignOptions): string;
export declare function verifyJwtToken(token: string, jwtSecret: string): {
    id: string;
    error: boolean;
};
export {};
