import Joi from "joi";
import {regexConstants} from "../configs";

export class allValidators {
    static email = Joi.string().regex(regexConstants.EMAIL)
        .trim().messages({
            'string.empty': 'This field is required!',
            'string.pattern.base': "Email is invalid format!",
        })

    static userName = Joi.string()
        .min(5)
        .max(18).messages({
            'string.empty': 'This field is required!',
            "string.max": 'userName length must be less than 18 characters!',
            "string.min": 'userName length must be more than 5 characters!'
        });
    static age = Joi.number()
        .min(1)
        .max(120)
        .messages({
            'number.empty': 'This field is required!',
            "number.max": 'age must be less than to 120 years!',
            "number.min": 'age must be more than  3 years!'
        });
    static password = Joi.string().regex(regexConstants.PASSWORD).trim().label('Password').messages({
        'string.empty': 'This field is required!',
        'string.pattern.base': 'Password is invalid format!',
    });

    static confirmPassword = Joi.any().valid(Joi.ref('password')).required()
        .messages({
            'any.only': 'Fields confirm password and password does not match!'
        });

    static changeEmail = Joi.object(
        {
            email: this.email.required()
        }
    )
    static editUser = Joi.object(
        {
            age: this.age.required(),
            userName: this.userName.required()
        }
    )

}