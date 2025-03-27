class PostgresDb {
    constructor(database) {
        this.database = database;
        if (!database) {
            throw new Error('Error: Database is required.'.red);
        }
    }
    async getCode(email) {
        const sql = "SELECT * FROM code WHERE email=$1";
        try {
            const response = await this.database.query(sql, [email]);
            return response.rows[0];
        }
        catch (error) {
            console.log(`Error: finding code for email ${email}:`.red, error);
        }
    }
    async createCode(email) {
        const sql = "INSERT INTO code(email) VALUES ($1) RETURNING *";
        try {
            const response = await this.database.query(sql, [email]);
            return response;
        }
        catch (error) {
            console.log(`Error: creating code for email ${email}:`.red, error);
        }
    }
    async findUser(email) {
        const sql = "SELECT * FROM auth WHERE email=$1";
        try {
            const response = await this.database.query(sql, [email]);
            return response.rows[0];
        }
        catch (error) {
            console.log(`Error: finding user with email ${email}:`.red, error);
        }
    }
    async createUser(email, password, userName, image) {
        const sql = "INSERT INTO auth (email, password, userName, image) VALUES ($1, $2, $3, $4) RETURNING *";
        try {
            const response = await this.database.query(sql, [email, password, userName || null, image || null]);
            return response;
        }
        catch (error) {
            console.log(`Error: creating user with email ${email}:`.red, error);
        }
    }
    async deleteUser(email, password) {
        const sql = "DELETE FROM auth WHERE email=$1 AND password=$2 RETURNING *";
        try {
            const response = await this.database.query(sql, [email, password]);
            return response;
        }
        catch (error) {
            console.log(`Error: deleting user with email ${email}:`.red, error);
        }
    }
    async updateUser(email, password, newEmail, newPassword, userName, image) {
        const updates = [];
        const values = [];
        let index = 1;
        if (newEmail) {
            updates.push(`email=$${index++}`);
            values.push(newEmail);
        }
        if (newPassword) {
            updates.push(`password=$${index++}`);
            values.push(newPassword);
        }
        if (userName) {
            updates.push(`userName=$${index++}`);
            values.push(userName);
        }
        if (image) {
            updates.push(`image=$${index++}`);
            values.push(image);
        }
        values.push(email, password);
        if (updates.length === 0)
            return;
        const sqlUpdate = `UPDATE auth SET ${updates.join(", ")} WHERE email=$${index++} AND password=$${index} RETURNING *`;
        try {
            const response = await this.database.query(sqlUpdate, values);
            return response;
        }
        catch (error) {
            console.log(`Error: updating user with email ${email}:`.red, error);
        }
    }
}
export default function simpliPostgres(database) {
    return new PostgresDb(database);
}
