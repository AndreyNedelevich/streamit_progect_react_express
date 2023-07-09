"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_mapper_1 = require("../mapers/user.mapper");
const user_service_1 = require("../services/user.service");
class UserController {
    async findAll(req, res, next) {
        try {
            const users = await user_service_1.userService.findAll();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async findByIdUser(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_service_1.userService.findById(userId);
            const response = user_mapper_1.userMapper.toResponse(user);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async findByTokenUser(req, res, next) {
        try {
            const dataFromToken = req.res.locals.tokenPayload;
            const user = await user_service_1.userService.findById(dataFromToken._id);
            const response = user_mapper_1.userMapper.toResponse(user);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async updateDataUserById(req, res, next) {
        try {
            const { userId } = req.params;
            const updatedUser = await user_service_1.userService.updateById(userId, req.body);
            const response = user_mapper_1.userMapper.toResponse(updatedUser);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async updateEmailUserById(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_service_1.userService.updateEmailUserById(req.body, userId);
            const response = user_mapper_1.userMapper.toResponse(user);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { userId } = req.params;
            await user_service_1.userService.deleteById(userId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            const { userId } = req.params;
            const avatar = req.files.avatar;
            console.log(avatar);
            const user = await user_service_1.userService.uploadAvatar(userId, avatar);
            const response = user_mapper_1.userMapper.toResponse(user);
            return res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteAvatar(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_service_1.userService.deleteAvatar(userId);
            const response = user_mapper_1.userMapper.toResponse(user);
            return res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
