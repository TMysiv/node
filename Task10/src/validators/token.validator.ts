import Joi from 'joi';

export const tokenValidator = {
    token: Joi.string().min(10).max(200)
        .required(),
};
