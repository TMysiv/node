import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { IPost, Post } from '../entity/posts';

class PostController {
    public async getAllPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const posts = await getManager().getRepository(Post).find();
        return res.json(posts);
    }

    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const newPost = await getManager().getRepository(Post).save(req.body);
        return res.status(201).json(newPost);
    }

    public async getPostById(req: Request, res: Response): Promise<Response<IPost>> {
        const { userId } = req.params;
        const user = await getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        return res.json(user);
    }

    public async updatePost(req:Request, res: Response):Promise<Response<IPost>> {
        const { id } = req.params;
        const { title, text } = req.body;
        const updatedPost = await getManager().getRepository(Post)
            .update({ id: +id }, {
                title, text,
            });
        return res.status(201).json(updatedPost);
    }
}
export const postController = new PostController();
