import { getManager } from 'typeorm';

import { Chats, IChats } from '../../entity';

class ChatsRepository {
    public async sendMessage(message:IChats):Promise<IChats> {
        return  getManager().getRepository(Chats).save(message);
    }
}
export const chatsRepository = new ChatsRepository();
