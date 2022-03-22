import bcrypt from 'bcrypt';

import { UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { usersRepository } from '../repository/users/usersRepository';

class UserService {
    public async getAllUsers():Promise<IUser[]> {
        return usersRepository.getAllUsers();
    }

    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashedPassword(password);
        const userHashed = { ...user, password: hashedPassword };
        return usersRepository.createUser(userHashed);
    }

    public async compareUserPassword(password:string, hash:string):Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exist');
        }
    }

    public async updateUser(email:string, password:string, id:number):Promise<UpdateResult> {
        return usersRepository.updateUser(email, password, id);
    }

    public async deleteUser(id:string): Promise<void> {
        await usersRepository.deleteUser(id);
    }

    private async _hashedPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
