import { UpdateResult } from 'typeorm';
import { IUser } from '../../entity';
import { IPaginationResponse } from '../../interface';

export interface UsersRepositoryInterface{
    getAllUsers():Promise<IUser[]>;
    createUser(user:IUser):Promise<IUser>;
    updateUser(email:string, password:string, id:number):Promise<IUser | any>;
    deleteUser(id:string): Promise<void>;
    updatePassword(password:string, id:number):Promise<UpdateResult>,
    getUserPagination(searchObject:any, limit:number, page:number):Promise<IPaginationResponse<IUser>>,
}
