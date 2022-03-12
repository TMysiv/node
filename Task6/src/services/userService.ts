import { IUser } from '../entity/user';
import { usersRepository } from '../repository/users/usersRepository';

class UserService {
    public async getAllUsers():Promise<IUser[]> {
        const users = await usersRepository.getAllUsers();
        return users;
    }

    public async createUser(user:IUser):Promise<IUser> {
        const createdUser = await usersRepository.createUser(user);
        return createdUser;
    }

    public async updateUser(email:string, password:string, id:number):Promise<IUser | any> {
        const updatedUser = await usersRepository.updateUser(email, password, id);
        return updatedUser;
    }

    public async deleteUser(id:string): Promise<void> {
        await usersRepository.deleteUser(id);
    }
}

export const userService = new UserService();
