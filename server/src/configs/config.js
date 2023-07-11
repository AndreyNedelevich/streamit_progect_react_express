"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    API_PORT: process.env.API_PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    FRONT_URL: process.env.FRONT_URL,
    JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
    SECRET_SALT: process.env.SECRET_SALT,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
    AWS_ACCESS: process.env.AWS_ACCESS,
    AWS_KEY: process.env.AWS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_NAME: process.env.AWS_NAME,
    AWS_S3_ACL: process.env.AWS_S3_ACL,
    AWS_S3_URL: process.env.AWS_S3_URL,
};
