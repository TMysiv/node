import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface/requsetExtend.interface';
import { tokenService, userService } from '../services/index';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');

            if (!authToken) {
                throw new Error('No Token');
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const users = await userService.getAllUsers();
            const userFromToken = users.find((user) => user.email === userEmail);

            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.json(e.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
