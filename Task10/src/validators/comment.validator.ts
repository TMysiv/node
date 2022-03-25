import Joi from 'joi';

export const commentValidator = {
    createComment: Joi.object({
        text: Joi.string().min(10).required(),
        like: Joi.number().required(),
        dislike: Joi.number().required(),
    }),
};
