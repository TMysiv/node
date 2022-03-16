import bcrypt from 'bcrypt';

import { UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { usersRepository } from '../repository/users/usersRepository';

class UserService {
    public async getAllUsers():Promise<IUser[]> {
        const users = await usersRepository.getAllUsers();
        return users;
    }

    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashedPassword(password);
        const userHashed = { ...user, password: hashedPassword };
        const createdUser = await usersRepository.createUser(userHashed);
        return createdUser;
    }

    public async updateUser(email:string, password:string, id:number):Promise<UpdateResult> {
        const updatedUser = await usersRepository.updateUser(email, password, id);
        return updatedUser;
    }

    public async deleteUser(id:string): Promise<void> {
        await usersRepository.deleteUser(id);
    }

    private async _hashedPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
