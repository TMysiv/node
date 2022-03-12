import { Request, Response } from 'express';

import { IPost } from '../entity/posts';
import { postService } from '../services/postService';

class PostController {
    public async getAllPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const posts = await postService.getAllPosts();
        return res.json(posts);
    }

    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const newPost = await postService.createPost(req.body);
        return res.status(201).json(newPost);
    }

    public async getPostByUserId(req: Request, res: Response): Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const posts = await postService.getPostsByUserId(userId);
        return res.json(posts);
    }

    public async updatePost(req:Request, res: Response):Promise<Response<IPost>> {
        const { id } = req.params;
        const { title, text } = req.body;
        const updatedPost = await postService.updatePost(id, title, text);
        return res.status(201).json(updatedPost);
    }
}
export const postController = new PostController();
