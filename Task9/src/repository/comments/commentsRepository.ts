import { EntityRepository, getManager, Repository } from 'typeorm';

import { IComment, Comment } from '../../entity/comments';
import { CommentsRepositoryInterface } from './commnetsRepository.interface';

@EntityRepository(Comment)
class CommentsRepository extends Repository<Comment> implements CommentsRepositoryInterface {
    public async getAllComment():Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async createComment(comment:IComment):Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async getCommentByUserId(userId:string):Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async updateCommentByAction(commentId:string, action:string):Promise<IComment> {
        const comment = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id: +commentId })
            .getOne();

        if (!comment) {
            throw new Error('no action by this comment');
        }

        if (action === 'like') {
            await getManager().getRepository(Comment)
                .update({ id: +commentId }, { like: comment.like + 1 });
        }

        if (action === 'dislike') {
            await getManager().getRepository(Comment)
                .update({ id: +commentId }, { like: comment.dislike + 1 });
        }
        return comment;
    }
}

export const commentsRepository = new CommentsRepository();
