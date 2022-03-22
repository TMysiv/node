import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { ITokens } from '../entity/tokens';
import { tokenRepository } from '../repository/token/tokenRepository';
import { IUserPayload } from '../interface/tokenData.interface';

class TokenService {
    public generateTokenPair(payload:{userId:number, userEmail:string}):
        { accessToken:string, refreshToken:string} {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return { accessToken, refreshToken };
    }

    async saveToken(userId:number, refreshToken:string, accessToken:string): Promise<ITokens> {
        const tokenFromDB = await tokenRepository.findTokeByUserId(userId);

        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        const token = await tokenRepository.createToken({ refreshToken, userId, accessToken });
        return token;
    }

    public async deleteUserTokenPair(userId:number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public async deleteTokenPairByParams(searchObject:Partial<ITokens>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    verifyToken(authToken:string, tokenType = 'access'):IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
