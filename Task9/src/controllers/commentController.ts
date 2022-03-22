import { Request, Response } from 'express';

import { IComment } from '../entity/comments';
import { commentService } from '../services/commentService';

class CommentController {
    public async getAllComment(req: Request, res: Response): Promise<Response<IComment[]>> {
        const comments = await commentService.getAllComment();
        return res.json(comments);
    }

    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const newComment = await commentService.createComment(req.body);
        return res.status(201).json(newComment);
    }

    public async getCommentByUserId(req: Request, res: Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await commentService.getCommentByUserId(userId);
        return res.json(comments);
    }

    public async updateCommentByAction(req: Request, res: Response): Promise<Response<IComment>> {
        const { commentId, action } = req.body;
        const comment = await commentService.updateCommentByAction(commentId, action);
        return res.status(201).json(comment);
    }
}
export const commentController = new CommentController();
