const {Router} = require('express');

const userRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const signInRouter = require('./signInRouter');

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', userRouter);
routes.use('/signIn',signInRouter);

routes.get('/error', ({ query }, res) => {
    res.render('error', { error: query.error });
});

routes.use((req, res) => {
    res.render('notFound')
});

module.exports = routes;

