import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export function formateDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
}
export function generateUserResponse(error, message, user) {
    return {
        user, error: {
            error: error,
            message: message
        }
    };
}
export function generateTokenResponse(error, message, token) {
    return {
        token, error: {
            error: error,
            message: message
        }
    };
}
export async function verifyHashPassword(inputPassword, storedPassword) {
    try {
        const isMatch = await bcrypt.compare(inputPassword, storedPassword);
        return isMatch;
    }
    catch (error) {
        console.log("Error! Verifying Password :".red, error);
        return false;
    }
}
export async function generateHashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }
    catch (error) {
        console.log("Error! Hashing Password :".red, error);
        return password;
    }
}
export function generateJwtToken(payload, jwtSecret, options) {
    const token = jwt.sign(payload, jwtSecret, options);
    return token;
}
export function verifyJwtToken(token, jwtSecret) {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded?.id) {
        return { id: decoded.id, error: false };
    }
    return { id: '', error: true };
}
