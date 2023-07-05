import Joi from "joi";
import {regexConstants} from "../configs";


const forgotValidator = Joi.object({
    email: Joi.string().regex(regexConstants.EMAIL)
        .required().trim().messages({
            'string.empty': 'This field is required!',
            'string.pattern.base': "Email is invalid format!",
        }),
});


const forgotPasswordValidator = Joi.object({
    password: Joi.string().regex(regexConstants.PASSWORD).trim().required().label('Password').messages({
        'string.empty': 'This field is required!',
        'string.pattern.base': 'Password is invalid format!',
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
        .messages({
            'any.only': 'Fields confirm password and password does not match!'
        }),
});

export {
    forgotValidator,
    forgotPasswordValidator
}