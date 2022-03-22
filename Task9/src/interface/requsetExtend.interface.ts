import { Request } from 'express';

import { IUser } from '../entity/user';

export interface IRequestExtend extends Request {
    user?: IUser;
}
