import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { IUser, User } from '../entity/user';

class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await getManager().getRepository(User)
            .createQueryBuilder('user')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getMany();
        return res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await getManager().getRepository(User).save(req.body);
        return res.json(createdUser);
    }

    public async updateUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const { password, email } = req.body;
        const updatedUser = await getManager()
            .getRepository(User)
            .update({ id: +id }, {
                password,
                email,
            });
        return res.json(updatedUser);
    }

    public async deleteUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deletedUser = await getManager()
            .getRepository(User)
            .softDelete({ id: +id });
        res.json(deletedUser);
    }
}

export const userController = new UserController();
