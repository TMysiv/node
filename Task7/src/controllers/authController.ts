import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { ITokenData } from '../interface/tokenData.interface';
import { IRequestExtend } from '../interface/requsetExtend.interface';
import { IUser } from '../entity/user';
import { tokenService } from '../services/tokenService';
import { tokenRepository } from '../repository/token/tokenRepository';
import { userService } from '../services/userService';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 1 * 60 * 60 * 1000, httpOnly: true },
        );
        return res.json(data);
    }

    async login(req:IRequestExtend, res:Response) {
        try {
            const { id, email, password: hashedPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPassword(password, hashedPassword);

            const tokenPair = tokenService.generateTokenPair({ userID: id, userEmail: email });
            const { refreshToken, accessToken } = tokenPair;

            await tokenRepository.createToken({ refreshToken, accessToken, id });
            res.json({
                accessToken,
                refreshToken,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
