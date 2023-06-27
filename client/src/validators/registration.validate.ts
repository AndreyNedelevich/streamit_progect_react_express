import Joi from "joi";
import {regexConstants} from '../constans'


const registrationValidator = Joi.object({
    email: Joi.string().regex(regexConstants.EMAIL)
        .required().trim().messages({
            'string.empty': 'This field is required!',
            'string.pattern.base': "Email is invalid format!",
        }),
    userName: Joi.string()
        .min(3)
        .max(20)
        .required().messages({
            'string.empty': 'This field is required!',
            "string.max":'"userName" length must be less than to 16 characters long'
        }),
    age: Joi.number()
        .min(3)
        .max(100)
        .required().messages({
            'number.empty': 'This field is required!',
            "number.max":'"age"  must be less than to 100 years',
            "number.min":'"age"  must be more than  3 years'
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