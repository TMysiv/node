import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';
import { Comment, IComment } from './comments';
import { config } from '../config/config';

export interface IPost {
    title: string;
    text: string;
    userId: number;
    comments: IComment[];
}

@Entity('Posts', { database: config.database })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];
}
