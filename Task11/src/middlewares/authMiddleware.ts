import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { tokenService, userService } from '../services';
import { tokenRepository } from '../repository/token/tokenRepository';
import { ErrorHandler } from '../error/ErrorHandler';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');

            if (!authToken) {
                next(new ErrorHandler('No Token', 400));
                return;
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const tokenFromDb = await tokenRepository.findTokenByParams({ accessToken: authToken });

            if (!tokenFromDb) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const users = await userService.getAllUsers();
            const userFromToken = users.find((user) => user.email === userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ErrorHandler('No Token', 401));
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenFromDb = await tokenRepository.findTokenByParams({ refreshToken });

            if (!tokenFromDb) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const users = await userService.getAllUsers();
            const userFromToken = users.find((user) => user.email === userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
