import { userService } from './userService';
import { IUser } from '../entity';

class AuthService {
    public async registration(body: IUser):Promise<IUser> {
        const { email } = body;

        const users = await userService.getAllUsers();
        const userWithSameEmail = users.find((user:IUser) => user.email === email);

        if (userWithSameEmail) {
            throw new Error('user with this email has exists');
        }
        return userService.createUser(body);
    }
}

export const authService = new AuthService();
