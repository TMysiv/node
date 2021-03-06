import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { usersRepository } from '../repository/users/usersRepository';
import { emailService } from './emailService';
import { emailActionEnum } from '../constants';
import { IPaginationResponse } from '../interface';

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

        await Promise.allSettled(users.map(async (user) => emailService.sendEmail(
            user.email,
            emailActionEnum.ALLDAYMAIL,
        )));
    }

    public async getUserPagination(
        filterObject:any,
        page:number,
        perPage:number,
    )
        :Promise<IPaginationResponse<IUser>> {
        return usersRepository.getUserPagination(filterObject, perPage, page);
    }
}

export const userService = new UserService();
