import { getManager } from 'typeorm';
import { IPost, Post } from '../entity/posts';

class PostService {
    public async getAllPosts():Promise<IPost[]> {
        const posts = await getManager().getRepository(Post).find();
        return posts;
    }

    public async createPost(post:IPost):Promise<IPost> {
        const newPost = await getManager().getRepository(Post).save(post);
        return newPost;
    }

    public async getPostsByUserId(userId:string):Promise<IPost[]> {
        const posts = getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        return posts;
    }

    public async updatePost(id:string, title:string, text:string):Promise<IPost | any> {
        const post = await getManager().getRepository(Post)
            .update({ id: +id }, {
                title, text,
            });
        return post;
    }
}

export const postService = new PostService();
