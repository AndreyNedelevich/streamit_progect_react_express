"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_type_enum_1 = require("../enums/token-type.enum");
const errors_1 = require("../errors");
const Action_model_1 = require("../models/Action.model");
const Token_model_1 = require("../models/Token.model");
const token_service_1 = require("../services/token.service");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new errors_1.ApiError("No token", 401);
            }
            const payload = token_service_1.tokenService.checkToken(accessToken, token_type_enum_1.ETokenType.Access);
            const entity = await Token_model_1.Token.findOne({ accessToken });
            if (!entity) {
                throw new errors_1.ApiError("Token not valid", 401);
            }
            req.res.locals.tokenPayload = payload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken) {
                throw new errors_1.ApiError("No token", 401);
            }
            const payload = token_service_1.tokenService.checkToken(refreshToken, token_type_enum_1.ETokenType.Refresh);
            const entity = await Token_model_1.Token.findOne({ refreshToken });
            if (!entity) {
                throw new errors_1.ApiError("Token not valid", 401);
            }
            req.res.locals.oldTokenPair = entity;
            req.res.locals.tokenPayload = { email: payload.email, _id: payload._id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkActionToken(tokenType) {
        return async (req, res, next) => {
            try {
                const actionToken = req.params.token;
                if (!actionToken) {
                    throw new errors_1.ApiError("Token is not provided", 400);
                }
                const jwtPayload = token_service_1.tokenService.checkActionToken(actionToken, tokenType);
                const tokenFromDb = await Action_model_1.Action.findOne({ actionToken });
                if (!tokenFromDb) {
                    throw new errors_1.ApiError("Token is invalid", 400);
                }
                req.res.locals = { jwtPayload, tokenFromDb };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.authMiddleware = new AuthMiddleware();
