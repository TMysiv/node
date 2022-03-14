import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { authService } from '../services/authService';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await authService.createUser(req.body);
        return res.status(201).json(createdUser);
    }
}

export const authController = new AuthController();
