"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_status_enum_1 = require("../enums/user-status.enum");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    userName: {
        type: String,
    },
    age: {
        type: Number,
        min: [1, "Minimum value for age is 1"],
        max: [199, "Maximum value for age is 199"],
    },
    status: {
        type: String,
        default: user_status_enum_1.EUserStatus.Inactive,
        enum: user_status_enum_1.EUserStatus,
    },
    avatar: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("user", userSchema);
