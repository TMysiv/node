import { getManager } from 'typeorm';
import { ITokens, Tokens } from '../../entity/tokens';

class TokenRepository {
    public async createToken(token:any):Promise<ITokens> {
        return getManager().getRepository(Tokens).save(token);
    }

    public async findTokeByUserId(userId:number):Promise<ITokens | undefined> {
        return getManager().getRepository(Tokens).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
