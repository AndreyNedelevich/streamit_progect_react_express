import Joi from "joi";
import {regexConstants} from "../configs";


const registrationValidator = Joi.object({
    email: Joi.string().regex(regexConstants.EMAIL)
        .required().trim().messages({
            'string.empty': 'This field is required!',
            'string.pattern.base': "Email is invalid format!",
        }),
    userName: Joi.string()
        .min(5)
        .max(18)
        .required().messages({
            'string.empty': 'This field is required!',
            "string.max":'userName userName length must be less 22 letters'
        }),
    age: Joi.number()
        .min(1)
        .max(120)
        .required().messages({
            'number.empty': 'This field is required!',
            "number.max":'age must be less than to 120 years',
            "number.min":'age must be more than  3 years'
        }),
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
    registrationValidator
}