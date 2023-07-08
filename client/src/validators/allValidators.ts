import Joi from "joi";
import {regexConstants} from "../configs";

export class allValidators{
   static email=Joi.string().regex(regexConstants.EMAIL)
       .trim().messages({
          'string.empty': 'This field is required!',
          'string.pattern.base': "Email is invalid format!",
       })

   static userName=Joi.string()
       .min(5)
       .max(18)
       .required().messages({
          'string.empty': 'This field is required!',
          "string.max":'"userName" length must be less than to 16 characters long'
       });
   static age=Joi.number()
       .min(1)
       .max(120)
       .required().messages({
          'number.empty': 'This field is required!',
          "number.max":'"age"  must be less than to 120 years',
          "number.min":'"age"  must be more than  3 years'
       });
   static password=Joi.string().regex(regexConstants.PASSWORD).trim().required().label('Password').messages({
      'string.empty': 'This field is required!',
      'string.pattern.base': 'Password is invalid format!',
   });

  static confirmPassword= Joi.any().valid(Joi.ref('password')).required()
      .messages({
         'any.only': 'Fields confirm password and password does not match!'
      });

  static changeEmail=Joi.object(
      {
         email:this.email.required()
      }
  )

}