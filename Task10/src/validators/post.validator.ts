import Joi from 'joi';

export const postValidator = {
    createPost: Joi.object({
        title: Joi.string().min(5).required(),
        text: Joi.string().min(10).required(),
    }),
};
