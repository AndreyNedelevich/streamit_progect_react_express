"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const middlewares_1 = require("../middlewares");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.userController.findAll);
router.get("/:userId", middlewares_1.commonMiddleware.isIdValid("userId"), auth_middleware_1.authMiddleware.checkAccessToken, user_controller_1.userController.findById);
router.get("/user/info", auth_middleware_1.authMiddleware.checkAccessToken, user_controller_1.userController.findByToken);
router.put("/:userId", middlewares_1.commonMiddleware.isIdValid("userId"), middlewares_1.commonMiddleware.isBodyValid(validators_1.UserValidator.update), auth_middleware_1.authMiddleware.checkAccessToken, user_controller_1.userController.updateById);
router.delete("/:userId", middlewares_1.commonMiddleware.isIdValid("userId"), auth_middleware_1.authMiddleware.checkAccessToken, user_controller_1.userController.deleteById);
exports.userRouter = router;
