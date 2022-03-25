import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { ErrorHandler } from '../error/ErrorHandler';
import { tokenValidator } from '../validators/token.validator';

class TokenMiddleware {
    async validateToken(req: IRequestExtend, res: Response, next: NextFunction):Promise<void> {
        try {
            const token = req.get('Authorization');

            if (!token) {
                next(new ErrorHandler('No Token', 401));
            }

            const { error } = tokenValidator.token.validate(token);

            if (error) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const tokenMiddleware = new TokenMiddleware();
