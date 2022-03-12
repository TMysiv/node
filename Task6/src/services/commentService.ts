import { getManager } from 'typeorm';
import { IComment, Comment } from '../entity/comments';

class CommentService {
    public async getAllComment():Promise<IComment[]> {
        const comments = await getManager().getRepository(Comment).find();
        return comments;
    }

    public async createComment(comment:IComment):Promise<IComment> {
        const newComment = await getManager().getRepository(Comment).save(comment);
        return newComment;
    }

    public async getCommentByUserId(userId:string):Promise<IComment[]> {
        const comments = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        return comments;
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

export const commentService = new CommentService();
