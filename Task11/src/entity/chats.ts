import { Column, Entity } from 'typeorm';
import { config } from '../config/config';
import { CommonFields, ICommonFields } from './commonFields';

export interface IChats extends ICommonFields{
    user:string,
    text:string,
    chat:string,
}

@Entity('Chats', { database: config.database })
export class Chats extends CommonFields implements IChats {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        user: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        chat: string;
}
