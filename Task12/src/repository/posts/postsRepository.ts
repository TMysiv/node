import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IPost, Post } from '../../entity/posts';
import { PostsRepositoryInterface } from './postsRepository.interface';

@EntityRepository(Post)
class PostsRepository extends Repository<Post> implements PostsRepositoryInterface {
    public async getAllPosts():Promise<IPost[]> {
        return getManager().getRepository(Post).find();
    }

    public async createPost(post:IPost):Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getPostsByUserId(userId:string):Promise<IPost[]> {
        return getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
    }

    public async updatePost(id:string, title:string, text:string):Promise<UpdateResult> {
        return getManager().getRepository(Post)
            .update({ id: +id }, {
                title, text,
            });
    }
}

export const postsRepository = new PostsRepository();
