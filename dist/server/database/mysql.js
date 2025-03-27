class mysqlDb {
    constructor(database) {
        this.database = database;
        if (!database) {
            throw new Error('"Error: Database is required.'.red);
        }
    }
    async getCode(email) {
        const sql = "SELECT * FROM code WHERE email=?";
        try {
            const [response] = await this.database.execute(sql, [email]);
            return response[0];
        }
        catch (error) {
            console.log(`Error: finding code for email ${email}:`.red, error);
        }
    }
    async createCode(email) {
        const sql = "INSERT INTO code(email) VALUES (?)";
        try {
            const [response] = await this.database.execute(sql, [email]);
            return response;
        }
        catch (error) {
            console.log(`Error: creating code for email ${email}:`.red, error);
        }
    }
    async findUser(email) {
        const sql = "SELECT * FROM auth WHERE email=?";
        try {
            const [response] = await this.database.execute(sql, [email]);
            return response[0];
        }
        catch (error) {
            console.log(`Error: finding user with email ${email}:`.red, error);
        }
    }
    async createUser(email, password, userName, image) {
        const sql = "INSERT INTO auth (email, password, userName, image) VALUES (?,?,?,?)";
        try {
            const [response] = await this.database.execute(sql, [email, password, userName || null, image || null]);
            return response;
        }
        catch (error) {
            console.log(`Error: creating user with email ${email}:`.red, error);
        }
    }
    async deleteUser(email, password) {
        const sql = "DELETE FROM auth WHERE email=? AND password=?";
        try {
            const [response] = await this.database.execute(sql, [email, password]);
            return response;
        }
        catch (error) {
            console.log(`Error: deleting user with email ${email}:`.red, error);
        }
    }
    async updateUser(email, password, newEmail, newPassword, userName, image) {
        const fieldsToUpdate = {
            email, password, userName, image
        };
        if (newEmail)
            fieldsToUpdate.email = newEmail;
        if (newPassword)
            fieldsToUpdate.password = newPassword;
        if (userName)
            fieldsToUpdate.userName = userName;
        if (image)
            fieldsToUpdate.image = image;
        const setClause = Object.keys(fieldsToUpdate)
            .map(field => `${field}=?`)
            .join(", ");
        const values = [...Object.values(fieldsToUpdate), email];
        const sqlUpdate = `UPDATE auth SET ${setClause} WHERE email=?`;
        try {
            const [response] = await this.database.execute(sqlUpdate, values);
            return response;
        }
        catch (error) {
            console.log(`Error: updating user with email ${email}:`.red, error);
        }
    }
}
export default function simpliMysql(database) {
    return new mysqlDb(database);
}
