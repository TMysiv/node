import { Request, Response } from 'express';

import { authService, tokenService, userService } from '../services/index';
import { ITokenData } from '../interface/tokenData.interface';
import { IRequestExtend } from '../interface/requsetExtend.interface';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repository/token/tokenRepository';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        return res.json(data);
    }

    async logout(req:IRequestExtend, res:Response):Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);
        return res.json('OK');
    }

    async login(req:IRequestExtend, res:Response) {
        try {
            const { id, email, password: hashedPassword } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashedPassword);

            const tokenPair = tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { refreshToken, accessToken } = tokenPair;

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                accessToken,
                refreshToken,
            });
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    refresh(req:IRequestExtend, res:Response) {

    }
}

export const authController = new AuthController();
