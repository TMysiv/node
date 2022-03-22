import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user';

export interface ITokens extends ICommonFields{
    refreshToken: string;
    accessToken: string;
    userId: number;
}

@Entity('Tokens', { database: 'okten' })
export class Tokens extends CommonFields implements ITokens {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken:string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,

    })
        accessToken:string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId:number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
