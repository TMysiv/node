import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokens } from "../entity/tokens";

class TokenService {
    public async generateTokenPair(payload:any):
        Promise<{ accessToken:string, refreshToken:string}> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return { accessToken, refreshToken };
    }

    public async saveToken(userId:number, refreshToken:string):Promise<ITokens>{
        
    }
}

export const tokenService = new TokenService();
