const {Router} = require('express');
const users = require('../db/users');

const signInRouter = Router();

signInRouter.get('/', (req, res) => {
    res.render('signIn');
});

signInRouter.post('/', ({body}, res) => {
    const user = users.find(user => user.email === body.email && user.password === body.password);

    if (!user) {
        const error = 'не вірний емейл чи пароль';
        res.render('error', {error});
    }

    res.redirect(`users/${user.id}`)

})

module.exports = signInRouter;