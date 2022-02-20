const {Router} = require('express');
const users = require('../db/users');

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
    res.render('login')
});

loginRouter.post('/', ({body}, res) => {
    const sameEmail = users.find(user => user.email === body.email);

    if (sameEmail) {
        const error = 'Такий емейл існує';
        res.render('error', {error});
        return
    }

    users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
    res.redirect('/users');

})

module.exports = loginRouter;
