import Joi from "joi";
import {regexConstants} from '../constans'


const registrationValidator = Joi.object({
    email: Joi.string().regex(regexConstants.EMAIL).lowercase()
        .required().trim().messages({
            'string.empty': 'Це поле обов\'язкове',
            'string.pattern.base': "Адрес электронной почты имеет неверный формат",
        }),
    userName: Joi.string().min(3).max(14).trim()
        .required().messages({
            'string.empty': 'Це поле обов\'язкове',
            'string.min':"display name должно быть более трех символов",
            'string.max':"display name иммет слишком много символов."
        }),
    password: Joi.string().regex(regexConstants.PASSWORD).trim().required().label('Password').messages({
        'string.empty': 'Це поле обов\'язкове!',
        'string.pattern.base': '{{#label}} иммет неверный формат!',
    }),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({
        'string.empty': 'Це поле обов\'язкове!',
        'any.only': '{{#label}} does not match'
    }),
});
export {
    registrationValidator
}