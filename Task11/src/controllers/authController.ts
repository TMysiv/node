import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IRequestExtend, ITokenData } from '../interface';
import { IUser } from '../entity';
import { tokenRepository } from '../repository/token/tokenRepository';
import { emailActionEnum } from '../constans';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<ITokenData>> {
        const { email } = req.body;

        const data = await authService.registration(req.body);
        await emailService.sendEmail(email, emailActionEnum.WELCOME);

        return res.json(data);
    }

    async logout(req:IRequestExtend, res:Response):Promise<Response<string>> {
        const { id, email } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        await emailService.sendEmail(email, emailActionEnum.LOGOUT);
        return res.json('Logout successfully');
    }

    async login(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const { id, email, password: hashedPassword } = req.user as IUser;

            const { password } = req.body;

            await emailService.sendEmail(email, emailActionEnum.LOGIN);

            await userService.compareUserPassword(password, hashedPassword);

            const tokenPair = tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { refreshToken, accessToken } = tokenPair;

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    async refreshToken(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const refresh = req.get('Authorization');
            const { id, email } = req.user as IUser;

            await tokenService.deleteTokenPairByParams({ refreshToken: refresh });

            const tokenPair = tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { accessToken, refreshToken } = tokenPair;
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
