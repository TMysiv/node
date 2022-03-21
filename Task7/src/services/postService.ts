import { UpdateResult } from 'typeorm';
import { IPost } from '../entity/posts';
import { postsRepository } from '../repository/posts/postsRepository';

class PostService {
    public async getAllPosts():Promise<IPost[]> {
        const posts = await postsRepository.getAllPosts();
        return posts;
    }

    public async createPost(post:IPost):Promise<IPost> {
        const newPost = await postsRepository.createPost(post);
        return newPost;
    }

    public async getPostsByUserId(userId:string):Promise<IPost[]> {
        const posts = await postsRepository.getPostsByUserId(userId);
        return posts;
    }

    public async updatePost(id:string, title:string, text:string):Promise<UpdateResult> {
        const post = await postsRepository.updatePost(id, title, text);
        return post;
    }
}

export const postService = new PostService();
