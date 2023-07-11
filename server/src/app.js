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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const crons_1 = require("./crons");
const auth_router_1 = require("./routers/auth.router");
const user_router_1 = require("./routers/user.router");
const PORT = config_1.configs.API_PORT || 5110;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: config_1.configs.FRONT_URL,
}));
app.use("/users", user_router_1.userRouter);
app.use("/auth", auth_router_1.authRouter);
app.use((err, req, res, next) => {
    const status = err.status || 5100;
    return res.status(status).json({
        message: err.message,
        status: err.status,
    });
});
app.listen(PORT, async () => {
    await mongoose.connect(config_1.configs.MONGODB_URL);
    (0, crons_1.cronRunner)();
    console.log(`Server has started on PORT $${PORT} 🥸`);
});
exports.default = app;
