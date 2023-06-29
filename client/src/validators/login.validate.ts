import Joi from "joi";


const loginValidator = Joi.object({
   email: Joi.string().email({tlds:false})
        .required().trim().messages({
            'string.empty': 'This field is required!',
            'string.email':"Email is invalid format!"
        }),
    password: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'This field is required!'
    }),
});
export {
    loginValidator
}