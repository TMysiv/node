import { IComment } from '../entity/comments';
import { commentsRepository } from '../repository/comments/commentsRepository';

class CommentService {
    public async getAllComment():Promise<IComment[]> {
        const comments = await commentsRepository.getAllComment();
        return comments;
    }

    public async createComment(comment:IComment):Promise<IComment> {
        const newComment = await commentsRepository.createComment(comment);
        return newComment;
    }

    public async getCommentByUserId(userId:string):Promise<IComment[]> {
        const comments = await commentsRepository.getCommentByUserId(userId);
        return comments;
    }

    public async updateCommentByAction(commentId:string, action:string):Promise<IComment> {
        const comment = await commentsRepository.updateCommentByAction(commentId, action);
        return comment;
    }
}

export const commentService = new CommentService();
