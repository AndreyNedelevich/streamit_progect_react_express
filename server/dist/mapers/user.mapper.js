"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper = void 0;
const config_1 = require("../configs/config");
class UserMapper {
    toResponse(user) {
        return {
            _id: user._id,
            userName: user.userName,
            age: user.age,
            email: user.email,
            status: user.status,
            avatar: user?.avatar ? `${config_1.configs.AWS_S3_URL}/${user.avatar}` : null,
        };
    }
}
exports.userMapper = new UserMapper();
