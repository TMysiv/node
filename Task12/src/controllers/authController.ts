import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IRequestExtend, ITokenData } from '../interface';
import { IUser } from '../entity';
import { tokenRepository } from '../repository/token/tokenRepository';
import { constants, emailActionEnum } from '../constants';
import { usersRepository } from '../repository/users/usersRepository';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<ITokenData>> {
        const { email, firstName } = req.body;

        const data = await authService.registration(req.body);
        await emailService.sendEmail(email, emailActionEnum.WELCOME, { userName: firstName });

        return res.json(data);
    }

    async logout(req:IRequestExtend, res:Response):Promise<Response<string>> {
        const { id, email, firstName } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        await emailService.sendEmail(email, emailActionEnum.LOGOUT, { userName: firstName });
        return res.json('Logout successfully');
    }

    async login(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const {
                id, email, password: hashedPassword, firstName,
            } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashedPassword);

            const tokenPair = tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { refreshToken, accessToken } = tokenPair;

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            await emailService.sendEmail(email, emailActionEnum.LOGIN, { userName: firstName });

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

    async sendForgotPassword(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const { email, id, firstName } = req.user as IUser;

            const activeToken = tokenService.generateActiveToken({ userId: id, userEmail: email });

            await tokenRepository.createActiveToken({ activeToken, userId: id });

            await emailService.sendEmail(
                email,
                emailActionEnum.FORGOTPASSWORD,
                { firstName, frontendUrl: constants.FrontendUrl, activeToken },
            );
            res.sendStatus(202);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req:IRequestExtend, res:Response, next:NextFunction) {
        try {
            const activeToken = req.get('Authorization');

            await tokenRepository.deleteBActiveToken({ activeToken });

            const { id } = req.user as IUser;
            const { password } = req.body;

            const hashedPassword = await userService.hashedPassword(password);

            await usersRepository.updatePassword(hashedPassword, id);

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
