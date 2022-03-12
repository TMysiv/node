import { getManager } from 'typeorm';

import { IUser, User } from '../entity/user';

class UserService {
    public async getAllUsers():Promise<IUser[]> {
        const users = await getManager().getRepository(User)
            .createQueryBuilder('user')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getMany();
        return users;
    }

    public async createUser(user:IUser):Promise<IUser> {
        const createdUser = await getManager().getRepository(User).save(user);
        return createdUser;
    }

    public async updateUser(email:string, password:string, id:number):Promise<IUser | any> {
        const updatedUser = await getManager()
            .getRepository(User)
            .update({ id: +id }, {
                password,
                email,
            });
        return updatedUser;
    }

    public async deleteUser(id:string): Promise<void> {
        await getManager()
            .getRepository(User)
            .softDelete({ id: +id });
    }
}

export const userService = new UserService();
