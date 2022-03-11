// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі

import express, { Response, Request } from 'express';
import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/user';
import { Post } from './entity/posts';
import { Comment } from './entity/comments';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .getMany();
    res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updatedUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
    const deletedUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

app.get('/posts', async (req: Request, res: Response) => {
    const posts = await getManager().getRepository(Post).find();
    res.json(posts);
});

app.post('/posts', async (req: Request, res: Response) => {
    try {
        const newPost = await getManager().getRepository(Post).save(req.body);
        res.status(200).json(newPost);
    } catch (e) {
        console.log(e);
    }
});

app.get('/posts/:userId', async (req, res: Response) => {
    try {
        const user = await getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +req.params.userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

app.patch('/posts/:id', async (req, res: Response) => {
    const { title, text } = req.body;
    try {
        const updatedPost = await getManager().getRepository(Post)
            .update({ id: Number(req.params.id) }, {
                title, text,
            });
        res.status(200).json(updatedPost);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments', async (req: Request, res: Response) => {
    try {
        const comments = await getManager().getRepository(Comment).find();
        res.status(200).json(comments);
    } catch (e) {
        console.log(e);
    }
});

app.post('/comments', async (req: Request, res: Response) => {
    try {
        const newComment = await getManager().getRepository(Comment).save(req.body);
        res.status(200).json(newComment);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments/:userId', async (req, res: Response) => {
    try {
        const comments = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +req.params.userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    } catch (e) {
        console.log(e);
    }
});

app.patch('/comments/action', async (req: Request, res: Response) => {
    try {
        const { commentId, action } = req.body;
        const comment = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();

        if (!comment) {
            throw new Error('no action by this comment');
        }

        if (action === 'like') {
            await getManager().getRepository(Comment)
                .update({ id: commentId }, { like: comment.like + 1 });
        }

        if (action === 'dislike') {
            await getManager().getRepository(Comment)
                .update({ id: commentId }, { like: comment.dislike + 1 });
        }

        res.status(200).json(comment);
    } catch (e) {
        console.log(e);
    }
});

app.listen(5000, async () => {
    console.log('Server has started!!!!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DATABASE Connect');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
