import express, { Response, Request } from 'express';
import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/user';
import {Post} from "./entity/posts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(User)
        .createQueryBuilder('users')
        .leftJoin('Posts', 'posts', 'posts.userId = users.id')
        .getMany();
    res.json(users);
});

app.post('/users', async (req:Request, res:Response) => {
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
        .delete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

app.get('/posts', async (req:Request, res:Response) => {
    const posts = await getManager().getRepository(Post).find();
    res.json(posts);
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
