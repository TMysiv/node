import {ITokens, Tokens} from "../../entity/tokens";
import {getManager} from "typeorm";

class TokenRepository{
    public async createToken(token:string):Promise<ITokens> {
        return getManager().getRepository(Tokens).save(token)
    }
}

export const tokenRepository = new TokenRepository();