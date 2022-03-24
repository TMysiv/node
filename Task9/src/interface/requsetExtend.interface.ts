import { Request } from 'express';

import { IUser } from '../entity';

export interface IRequestExtend extends Request {
    user?: IUser;
}
