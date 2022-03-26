import Joi from 'joi';

export const paramsValidator = {
    id: Joi.object({
        id: Joi.string().min(1).required(),
    }),
};
