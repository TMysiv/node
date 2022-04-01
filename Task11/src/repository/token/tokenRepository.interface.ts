import { ITokens, Tokens, IActiveTokens } from '../../entity';

export interface ITokenRepositoryInterface{
    createToken(token:any):Promise<ITokens>,
    findTokeByUserId(userId:number):Promise<ITokens | undefined>,
    findTokenByParams(searchObject:Partial<ITokens>):Promise<Tokens | undefined>,
    findActiveTokenByParams(searchObject:Partial<ITokens>):Promise<IActiveTokens | undefined>,
    createActiveToken(token:any):Promise<string>
}
