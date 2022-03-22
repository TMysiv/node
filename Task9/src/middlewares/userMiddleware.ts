import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface/requsetExtend.interface';
import { usersRepository } from '../repository/users/usersRepository';
import { IUser } from '../entity/user';

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
}

export const userMiddleware = new UserMiddleware();
