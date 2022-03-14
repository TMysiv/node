import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';

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

    public async deleteUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        res.json(deletedUser);
    }
}

export const userController = new UserController();
