import Joi from "joi";


const authValidator = Joi.object({
   email: Joi.string().email({tlds:false})
        .required().messages({
            'string.empty': 'Це поле обов\'язкове',
            'string.email':'Адрес электронной почты имеет неверный формат'
        }),
    password: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'Це поле обов\'язкове'
    }),
});
export {
    authValidator
}