import { IUser } from '../../entity/user';

export interface UsersRepositoryInterface{
    getAllUsers():Promise<IUser[]>;
    createUser(user:IUser):Promise<IUser>;
    updateUser(email:string, password:string, id:number):Promise<IUser | any>;
    deleteUser(id:string): Promise<void>;
}
