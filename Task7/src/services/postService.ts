import { UpdateResult } from 'typeorm';

import { IPost } from '../entity/posts';
import { postsRepository } from '../repository/posts/postsRepository';

class PostService {
    public async getAllPosts():Promise<IPost[]> {
        return postsRepository.getAllPosts();
    }

    public async createPost(post:IPost):Promise<IPost> {
        return postsRepository.createPost(post);
    }

    public async getPostsByUserId(userId:string):Promise<IPost[]> {
        return postsRepository.getPostsByUserId(userId);
    }

    public async updatePost(id:string, title:string, text:string):Promise<UpdateResult> {
        return postsRepository.updatePost(id, title, text);
    }
}

export const postService = new PostService();
