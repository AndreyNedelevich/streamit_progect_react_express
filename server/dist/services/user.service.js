"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const action_token_type_enum_1 = require("../enums/action-token-type.enum");
const email_enum_1 = require("../enums/email.enum");
const user_status_enum_1 = require("../enums/user-status.enum");
const errors_1 = require("../errors");
const User_mode_1 = require("../models/User.mode");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("./email.service");
const token_service_1 = require("./token.service");
const s3_service_1 = require("./s3.service");
class UserService {
    async findAll() {
        return await User_mode_1.User.find();
    }
    async create(data) {
        return await user_repository_1.userRepository.create(data);
    }
    async findById(id) {
        return await this.getOneByIdOrThrow(id);
    }
    async updateEmailUserById(dto, userId) {
        const userWithBD = await this.getOneByIdOrThrow(userId);
        if (userWithBD.email === dto.email) {
            throw new errors_1.ApiError("This is the email address used by your account.", 422);
        }
        const user = await User_mode_1.User.findOneAndUpdate({ _id: userWithBD._id }, { $set: { email: dto.email, status: user_status_enum_1.EUserStatus.Inactive } }, { returnDocument: "after" });
        if (user) {
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: userWithBD._id, userName: userWithBD.userName }, action_token_type_enum_1.EActionTokenTypes.Activate);
            email_service_1.emailService.sendMail(dto.email, email_enum_1.EEmailActions.WELCOME, {
                email: user.email,
                userName: user.userName,
                actionToken,
            });
        }
        return user;
    }
    async updateById(userId, dto) {
        await this.getOneByIdOrThrow(userId);
        return await User_mode_1.User.findOneAndUpdate({ _id: userId }, { ...dto }, { returnDocument: "after" });
    }
    async uploadAvatar(userId, avatar) {
        const user = await this.getOneByIdOrThrow(userId);
        if (user.avatar) {
            await s3_service_1.s3Service.deleteFile(user.avatar);
        }
        const pathToFile = await s3_service_1.s3Service.uploadFile(avatar, "user", userId);
        return await User_mode_1.User.findByIdAndUpdate(userId, { $set: { avatar: pathToFile } }, { new: true });
    }
    async deleteAvatar(userId) {
        const user = await this.getOneByIdOrThrow(userId);
        if (!user.avatar) {
            return user;
        }
        await s3_service_1.s3Service.deleteFile(user.avatar);
        return await User_mode_1.User.findByIdAndUpdate(userId, { $unset: { avatar: true } }, { new: true });
    }
    async deleteById(userId) {
        await this.getOneByIdOrThrow(userId);
        await User_mode_1.User.deleteOne({ _id: userId });
    }
    async getOneByIdOrThrow(userId) {
        const user = await User_mode_1.User.findById(userId);
        if (!user) {
            throw new errors_1.ApiError("User not found", 422);
        }
        return user;
    }
}
exports.userService = new UserService();
