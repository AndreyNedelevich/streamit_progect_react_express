"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const action_token_type_enum_1 = require("../enums/action-token-type.enum");
const token_type_enum_1 = require("../enums/token-type.enum");
const errors_1 = require("../errors");
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, config_1.configs.JWT_ACCESS_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, config_1.configs.JWT_REFRESH_SECRET, {
            expiresIn: "30m",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    checkToken(token, type) {
        try {
            let secret;
            switch (type) {
                case token_type_enum_1.ETokenType.Access:
                    secret = config_1.configs.JWT_ACCESS_SECRET;
                    break;
                case token_type_enum_1.ETokenType.Refresh:
                    secret = config_1.configs.JWT_REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new errors_1.ApiError("Token not valid", 401);
        }
    }
    generateActionToken(payload, tokenType) {
        try {
            let secret;
            switch (tokenType) {
                case action_token_type_enum_1.EActionTokenTypes.Forgot:
                    secret = config_1.configs.JWT_FORGOT_SECRET;
                    break;
                case action_token_type_enum_1.EActionTokenTypes.Activate:
                    secret = config_1.configs.JWT_ACTIVATE_SECRET;
                    break;
            }
            return jwt.sign(payload, secret, { expiresIn: "7d" });
        }
        catch (e) {
            throw new errors_1.ApiError("Token not valid", 401);
        }
    }
    checkActionToken(token, tokenType) {
        try {
            let secret;
            switch (tokenType) {
                case action_token_type_enum_1.EActionTokenTypes.Forgot:
                    secret = config_1.configs.JWT_FORGOT_SECRET;
                    break;
                case action_token_type_enum_1.EActionTokenTypes.Activate:
                    secret = config_1.configs.JWT_ACTIVATE_SECRET;
                    break;
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new errors_1.ApiError("Token not valid", 401);
        }
    }
}
exports.tokenService = new TokenService();
