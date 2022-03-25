import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { postValidator } from '../validators';
import { ErrorHandler } from '../error/ErrorHandler';

class PostMiddleware {
    async validatePost(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = postValidator.createPost.validate(req.body);

            if (error) {
                next(new ErrorHandler('post is not valid', 401));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
