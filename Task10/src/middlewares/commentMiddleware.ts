import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { commentValidator } from '../validators';
import { ErrorHandler } from '../error/ErrorHandler';

class CommentMiddleware {
    async validateComment(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = commentValidator.createComment.validate(req.body);

            if (error) {
                next(new ErrorHandler('comment is not valid', 401));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
