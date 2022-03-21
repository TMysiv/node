import { userService } from './userService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';
import { ITokenData } from '../interface/tokenData.interface';

class AuthService {
    public async registration(body: IUser):Promise<ITokenData> {
        const { email } = body;

        const users = await userService.getAllUsers();
        const userWithSameEmail = users.find((user:IUser) => user.email === email);

        if (userWithSameEmail) {
            throw new Error('user with this email has exists');
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData:IUser):Promise<ITokenData> {
        const { id, email } = userData;

        const tokensPair = tokenService.generateTokenPair({ userID: id, userEmail: email });
        const { accessToken, refreshToken } = tokensPair;
        await tokenService.saveToken(id, refreshToken, accessToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
