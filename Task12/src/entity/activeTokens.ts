import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user';
import { config } from '../config/config';

export interface IActiveTokens extends ICommonFields{
    activeToken: string;
    userId: number;
}

@Entity('ActiveTokens', { database: config.database })
export class ActiveTokens extends CommonFields implements IActiveTokens {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        activeToken:string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId:number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
