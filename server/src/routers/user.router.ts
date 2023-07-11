import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
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
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
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
  "/delete/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.deleteById
);

router.post(
  "/avatar/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar
);

router.delete(
  "/avatar/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteAvatar
);

export const userRouter = router;
