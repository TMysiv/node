import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { usersRepository } from '../repository/users/usersRepository';
import { IUser } from '../entity';
import { authValidator, paramsValidator } from '../validators';
import { ErrorHandler } from '../error/ErrorHandler';

class UserMiddleware {
    public async checkIsUserExist(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const users = await usersRepository.getAllUsers();
            const userFromDB = users.find((user:IUser) => user.email === email);

            if (!userFromDB) {
                next(new ErrorHandler('User is not found', 400));
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
        }
    }

    async validateRegistr(req: IRequestExtend, res: Response, next: NextFunction):Promise<void> {
        try {
            const { error, value } = authValidator.registration.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async validateLogin(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    async validateId(req: IRequestExtend, res: Response, next: NextFunction):Promise<void> {
        try {
            const { error, value } = paramsValidator.id.validate(req.params);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }

            req.params = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async validateUpdate(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidator.update.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    async validEmail(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidator.validEmail.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    async validPassword(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidator.validPass.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
