import Joi from 'joi';

import { regex } from '../constans/regex';

export const authValidator = {
    registration: Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        age: Joi.number().min(18),
        phone: Joi.string().regex(regex.Phone).required(),
        email: Joi.string().regex(regex.Email).required(),
        password: Joi.string().min(8).required(),
    }),

    login: Joi.object({
        email: Joi.string().regex(regex.Email).required(),
        password: Joi.string().min(8).required(),
    }),

    update: Joi.object({
        email: Joi.string().regex(regex.Email).required(),
        password: Joi.string().min(8).required(),
    }),
};
