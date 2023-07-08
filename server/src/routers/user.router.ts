import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.findByIdUser
);

router.get(
  "/user/info",
  authMiddleware.checkAccessToken,
  userController.findByTokenUser
);

router.put(
  "/update/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  userController.updateDataUserById
);

router.put(
  "/update_email/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.findAndThrow("email"),
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  userController.updateEmailUserById
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.deleteById
);

export const userRouter = router;
