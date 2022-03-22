import { ITokens } from '../../entity/tokens';

export interface ITokenRepositoryInterface{
    createToken(token:any):Promise<ITokens>,
    findTokeByUserId(userId:number):Promise<ITokens | undefined>,
}
