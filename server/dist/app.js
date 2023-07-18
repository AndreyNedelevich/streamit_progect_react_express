"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./configs/config");
const crons_1 = require("./crons");
const auth_router_1 = require("./routers/auth.router");
const user_router_1 = require("./routers/user.router");
const app = (0, express_1.default)();
const PORT = config_1.configs.API_PORT || 5110;
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
    await mongoose_1.default.connect(config_1.configs.MONGODB_URL);
    (0, crons_1.cronRunner)();
    console.log(`Server has started on PORT $${PORT} 🥸`);
});
