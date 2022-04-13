import { EntityRepository, getManager, Repository } from 'typeorm';
import { ITokens, Tokens } from '../../entity/tokens';
import { ITokenRepositoryInterface } from './tokenRepository.interface';
import { ActiveTokens, IActiveTokens } from '../../entity';

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

    public async findActiveTokenByParams(searchObject:Partial<IActiveTokens>):
        Promise<IActiveTokens | undefined> {
        return getManager().getRepository(ActiveTokens).findOne(searchObject);
    }

    public async deleteByParams(findObject:Partial<ITokens>) {
        return getManager().getRepository(Tokens).delete(findObject);
    }

    public async deleteBActiveToken(findObject:Partial<IActiveTokens>) {
        return getManager().getRepository(ActiveTokens).delete(findObject);
    }

    public async createActiveToken(token:any):Promise<string> {
        return getManager().getRepository(ActiveTokens).save(token);
    }
}

export const tokenRepository = new TokenRepository();
