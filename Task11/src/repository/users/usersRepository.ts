import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../../entity';
import { UsersRepositoryInterface } from './usersRepository.interface';

dayjs.extend(utc);

@EntityRepository(User)
class UsersRepository extends Repository<User> implements UsersRepositoryInterface {
    public async getAllUsers():Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getMany();
    }

    public async createUser(user:IUser):Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(email:string, password:string, id:number):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id: +id }, {
                password,
                email,
            });
    }

    public async deleteUser(id:string): Promise<void> {
        await getManager()
            .getRepository(User)
            .softDelete({ id: +id });
    }

    public async updatePassword(password:string, id:number):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id: +id }, {
                password,
            });
    }

    public getNewUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', { date: dayjs().utc().startOf('day').format() })
            .getMany();
    }
}

export const usersRepository = new UsersRepository();
