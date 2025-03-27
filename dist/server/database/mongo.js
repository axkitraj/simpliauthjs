class MongoDb {
    constructor(database) {
        this.database = database;
        if (!database) {
            throw new Error('Error: Database is required.'.red);
        }
        this.codeCollection = this.database.collection('code');
        this.authCollection = this.database.collection('auth');
    }
    async getCode(email) {
        try {
            return await this.codeCollection.findOne({ email });
        }
        catch (error) {
            console.log(`Error: finding code for email ${email}:`.red, error);
        }
    }
    async createCode(email) {
        try {
            return await this.codeCollection.insertOne({ email });
        }
        catch (error) {
            console.log(`Error: creating code for email ${email}:`.red, error);
        }
    }
    async findUser(email) {
        try {
            return await this.authCollection.findOne({ email });
        }
        catch (error) {
            console.log(`Error: finding user with email ${email}:`.red, error);
        }
    }
    async createUser(email, password, userName, image) {
        try {
            return await this.authCollection.insertOne({ email, password, userName: userName || null, image: image || null });
        }
        catch (error) {
            console.log(`Error: creating user with email ${email}:`.red, error);
        }
    }
    async deleteUser(email, password) {
        try {
            return await this.authCollection.deleteOne({ email, password });
        }
        catch (error) {
            console.log(`Error: deleting user with email ${email}:`.red, error);
        }
    }
    async updateUser(email, password, newEmail, newPassword, userName, image) {
        const updates = {};
        if (newEmail)
            updates.email = newEmail;
        if (newPassword)
            updates.password = newPassword;
        if (userName)
            updates.userName = userName;
        if (image)
            updates.image = image;
        if (Object.keys(updates).length === 0)
            return;
        try {
            return await this.authCollection.updateOne({ email, password }, { $set: updates });
        }
        catch (error) {
            console.log(`Error: updating user with email ${email}:`.red, error);
        }
    }
}
export default function simpliMongoDb(database) {
    return new MongoDb(database);
}
