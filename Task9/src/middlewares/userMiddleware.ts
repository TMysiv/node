import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { usersRepository } from '../repository/users/usersRepository';
import { IUser } from '../entity';
import { authValidator } from '../validators/auth/auth.validator';

class UserMiddleware {
    public async checkIsUserExist(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const users = await usersRepository.getAllUsers();
            const userFromDB = users.find((user:IUser) => user.email === email);

            if (!userFromDB) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async validateRegistr(req: IRequestExtend, res: Response, next: NextFunction):Promise<void> {
        try {
            const { error, value } = authValidator.registration.validate(req.body);

            if (error) {
                throw new Error('');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validateLogin(req: IRequestExtend, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                throw new Error('');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
