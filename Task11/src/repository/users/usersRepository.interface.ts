import { UpdateResult } from 'typeorm';
import { IUser } from '../../entity';

export interface UsersRepositoryInterface{
    getAllUsers():Promise<IUser[]>;
    createUser(user:IUser):Promise<IUser>;
    updateUser(email:string, password:string, id:number):Promise<IUser | any>;
    deleteUser(id:string): Promise<void>;
    updatePassword(password:string, id:number):Promise<UpdateResult>,
}
