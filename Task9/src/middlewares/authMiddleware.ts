import { NextFunction, Response } from 'express';

import { IRequestExtend } from '../interface';
import { tokenService, userService } from '../services';
import { tokenRepository } from '../repository/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');

            if (!authToken) {
                throw new Error('No Token');
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const tokenFromDb = await tokenRepository.findTokenByParams({ accessToken: authToken });

            if (!tokenFromDb) {
                throw new Error('Token not valid');
            }

            const users = await userService.getAllUsers();
            const userFromToken = users.find((user) => user.email === userEmail);

            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.status(401).json(e.message);
        }
    }

    public async checkRefreshToken(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Error('No Token');
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenFromDb = await tokenRepository.findTokenByParams({ refreshToken });

            if (!tokenFromDb) {
                throw new Error('Token not valid');
            }

            const users = await userService.getAllUsers();
            const userFromToken = users.find((user) => user.email === userEmail);

            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.status(401).json(e.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
