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

    public async findTokenByParams(searchObject:Partial<ITokens>):Promise<Tokens | undefined> {
        return getManager().getRepository(Tokens).findOne(searchObject);
    }

    public async deleteByParams(findObject:Partial<ITokens>) {
        return getManager().getRepository(Tokens).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
