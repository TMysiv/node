import { IPost } from '../../entity/posts';

export interface PostsRepositoryInterface{
    getAllPosts():Promise<IPost[]>;
    createPost(post:IPost):Promise<IPost>;
    getPostsByUserId(userId:string):Promise<IPost[]>;
    updatePost(id:string, title:string, text:string):Promise<IPost | any>;
}
