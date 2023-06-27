import Joi from "joi";

import { regexConstants } from "../constants";


export class UserValidator {
  static userName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(199);
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "Це поле обов'язкове",
      "string.email": "Адрес электронной почты имеет неверный формат",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  static create = Joi.object({
    userName: this.userName.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    email: this.email.required(),
    userName: this.userName,
    age: this.age,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static forgotPassword = Joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = Joi.object({
    password: this.password.required(),
  });
}
