import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Comment, IComment } from '../entity/comments';

class CommentController {
    public async getAllComment(req: Request, res: Response): Promise<Response<IComment[]>> {
        const comments = await getManager().getRepository(Comment).find();
        return res.json(comments);
    }

    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const newComment = await getManager().getRepository(Comment).save(req.body);
        return res.status(201).json(newComment);
    }

    public async getCommentByUserId(req: Request, res: Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        return res.json(comments);
    }

    public async updateCommentByAction(req: Request, res: Response): Promise<Response<IComment>> {
        const { commentId, action } = req.body;
        const comment = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();

        if (!comment) {
            throw new Error('no action by this comment');
        }

        if (action === 'like') {
            await getManager().getRepository(Comment)
                .update({ id: commentId }, { like: comment.like + 1 });
        }

        if (action === 'dislike') {
            await getManager().getRepository(Comment)
                .update({ id: commentId }, { like: comment.dislike + 1 });
        }

        return res.status(201).json(comment);
    }
}
export const commentController = new CommentController();
