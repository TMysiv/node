import { IComment } from '../../entity/comments';

export interface CommentsRepositoryInterface{
    getAllComment():Promise<IComment[]>;
    createComment(comment:IComment):Promise<IComment>;
    getCommentByUserId(userId:string):Promise<IComment[]>;
    updateCommentByAction(commentId:string, action:string):Promise<IComment>;
}
