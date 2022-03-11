"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const posts_1 = require("./entity/posts");
const comments_1 = require("./entity/comments");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .getMany();
    res.json(users);
});
app.post('/users', async (req, res) => {
    const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createdUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updatedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(updatedUser);
});
app.delete('/users/:id', async (req, res) => {
    const deletedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});
app.get('/posts', async (req, res) => {
    const posts = await (0, typeorm_1.getManager)().getRepository(posts_1.Post).find();
    res.json(posts);
});
app.post('/posts', async (req, res) => {
    try {
        const newPost = await (0, typeorm_1.getManager)().getRepository(posts_1.Post).save(req.body);
        res.status(200).json(newPost);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/posts/:userId', async (req, res) => {
    try {
        const user = await (0, typeorm_1.getManager)().getRepository(posts_1.Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +req.params.userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(user);
    }
    catch (e) {
        console.log(e);
    }
});
app.patch('/posts/:id', async (req, res) => {
    const { title, text } = req.body;
    try {
        const updatedPost = await (0, typeorm_1.getManager)().getRepository(posts_1.Post)
            .update({ id: Number(req.params.id) }, {
            title, text,
        });
        res.status(200).json(updatedPost);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/comments', async (req, res) => {
    try {
        const comments = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).find();
        res.status(200).json(comments);
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/comments', async (req, res) => {
    try {
        const newComment = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).save(req.body);
        res.status(200).json(newComment);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/comments/:userId', async (req, res) => {
    try {
        const comments = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +req.params.userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    }
    catch (e) {
        console.log(e);
    }
});
app.patch('/comments/action', async (req, res) => {
    try {
        const { commentId, action } = req.body;
        const comment = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();
        if (!comment) {
            throw new Error('no action by this comment');
        }
        if (action === 'like') {
            await (0, typeorm_1.getManager)().getRepository(comments_1.Comment)
                .update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await (0, typeorm_1.getManager)().getRepository(comments_1.Comment)
                .update({ id: commentId }, { like: comment.dislike + 1 });
        }
        res.status(200).json(comment);
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(5000, async () => {
    console.log('Server has started!!!!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('DATABASE Connect');
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
//# sourceMappingURL=app.js.map