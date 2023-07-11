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
        .max(22).messages({
            'string.empty': 'This field is required!',
            "string.max": 'UserName length must be less 22 letters!',
            "string.min": 'UserName length must be more  5 letters!'
        });
    static age = Joi.number()
        .min(1)
        .max(120)
        .messages({
            'number.empty': 'This field is required!',
            "number.max": 'Age must be less than to 120 years!',
            "number.min": 'Age must be more than  3 years!'
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

    static forgotValidator = Joi.object(
        {
            email: this.email.required()
        }
    )

    static forgotPasswordValidator = Joi.object(
        {
            password: Joi.string().regex(regexConstants.PASSWORD).required().trim().label('Password').messages({
                'string.empty': 'This field is required!',
                'string.pattern.base': 'Password is invalid format!',
            }),
            confirmPassword: Joi.any().valid(Joi.ref('password')).required()
                .messages({
                    'any.only': 'Fields confirm password and password does not match!'
                }),
        }
    )
    static loginValidator = Joi.object(
        {
            email: this.email.required(),
            password: this.password.required()
        }
    )

    static passwordUpdateValidator = Joi.object(
        {
            oldPassword: Joi.string().trim().required().messages({
                'string.empty': 'This field is required!',
            }),
            password: this.password.required(),
            confirmPassword: this.confirmPassword.required()
        })

    static registrationValidator = Joi.object(
        {
            email: this.email.required(),
            userName: this.userName.required(),
            age: this.age.required(),
            password: Joi.string().regex(regexConstants.PASSWORD).required().trim().label('Password').messages({
                'string.empty': 'This field is required!',
                'string.pattern.base': 'Password is invalid format!',
            }),
            confirmPassword: Joi.any().valid(Joi.ref('password')).required()
                .messages({
                    'any.only': 'Fields confirm password and password does not match!'
                }),
        })
}