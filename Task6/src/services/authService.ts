import { userService } from './userService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';

class AuthService {
    public async createUser(user: IUser): Promise<IUser> {
        const { email } = user;

        const users = await userService.getAllUsers();
        const userWithSameEmail = users.find((us:IUser) => us.email === email);

        if (userWithSameEmail) {
            throw new Error('user with this email has exists');
        }
        const createdUser = await userService.createUser(user);
        return createdUser;
    }

    private async _getTokenData(userData:IUser) {
        const { id, email } = userData;

        const tokensPair = await tokenService.generateTokenPair({ userID: id, userEmail: email });
    }
}

export const authService = new AuthService();
