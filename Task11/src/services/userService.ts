import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { usersRepository } from '../repository/users/usersRepository';
import { emailService } from './emailService';
import { emailActionEnum } from '../constants';

class UserService {
    public async getAllUsers():Promise<IUser[]> {
        return usersRepository.getAllUsers();
    }

    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this.hashedPassword(password);
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

    public async hashedPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async sendAllDayMail() {
        const users = await usersRepository.getAllUsers();
        // eslint-disable-next-line no-restricted-syntax
        for (const user of users) {
            const { email } = user;
            emailService.sendEmail(email, emailActionEnum.ALLDAYMAIL);
        }
    }
}

export const userService = new UserService();
