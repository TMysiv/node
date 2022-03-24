import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, User } from '../../entity';
import { UsersRepositoryInterface } from './usersRepository.interface';

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
}

export const usersRepository = new UsersRepository();
