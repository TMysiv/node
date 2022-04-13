import { IChats } from '../../entity';

export interface ChatsRepositoryInterface {
    sendMessage(message:IChats):Promise<IChats>
}
