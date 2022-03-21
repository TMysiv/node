import { EntityRepository, getManager, Repository } from 'typeorm';
import { ITokens, Tokens } from '../../entity/tokens';
import { ITokenRepositoryInterface } from './tokenRepository.interface';

@EntityRepository(Tokens)
class TokenRepository extends Repository<Tokens> implements ITokenRepositoryInterface {
    public async createToken(token:any):Promise<ITokens> {
        return getManager().getRepository(Tokens).save(token);
    }

    public async findTokeByUserId(userId:number):Promise<ITokens | undefined> {
        return getManager().getRepository(Tokens).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
