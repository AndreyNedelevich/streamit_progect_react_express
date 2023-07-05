import Joi from "joi";
import {regexConstants} from "../configs";



const passwordUpdateValidator = Joi.object({
    oldPassword: Joi.string().trim().required().messages({
        'string.empty': 'This field is required!',
    }),
    password: Joi.string().regex(regexConstants.PASSWORD).trim().required().messages({
        'string.empty': 'This field is required!',
        'string.pattern.base': 'Password is invalid format!',
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
        .messages({
            'any.only': 'Fields confirm password and password does not match!'
        }),
});

export {
    passwordUpdateValidator
}