import { IComment } from '../entity';
import { commentsRepository } from '../repository/comments/commentsRepository';

class CommentService {
    public async getAllComment():Promise<IComment[]> {
        return commentsRepository.getAllComment();
    }

    public async createComment(comment:IComment):Promise<IComment> {
        return commentsRepository.createComment(comment);
    }

    public async getCommentByUserId(userId:string):Promise<IComment[]> {
        return commentsRepository.getCommentByUserId(userId);
    }

    public async updateCommentByAction(commentId:string, action:string):Promise<IComment> {
        return commentsRepository.updateCommentByAction(commentId, action);
    }
}

export const commentService = new CommentService();
