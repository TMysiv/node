import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity';
import { userService } from '../services';
import { IRequestExtend } from '../interface';

class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    public async updateUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const { email, password } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUser(email, password, +id);
        return res.json(updatedUser);
    }

    public async deleteUserById(req: Request, res: Response): Promise<Response<void>> {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        return res.json(deletedUser);
    }

    public async getUserPagination(req: IRequestExtend, res: Response, next:NextFunction) {
        try {
            const { page, perPage, ...other } = req.query;

            // @ts-ignore
            const userPagination = await userService.getUserPagination(other, +page, +perPage);

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
