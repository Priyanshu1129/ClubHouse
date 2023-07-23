const UserModel = require('../models/user-model');
class UserService {
    async findUser(filter) {
        const user = await UserModel.findOne(filter);
        return user;
    }

    async createUser(data) {
        console.log("create user", data)
        const user = await UserModel.create(data);
        console.group('created', user)
        return user;
    }
}

module.exports = new UserService();
