const {Router} = require('express');
const users = require('../db/users');

const userRouter = Router();

userRouter.get('/', ({query}, res) => {
    let array = [...users];

    if (query.age) {
        array = array.filter(arr => arr.age === query.age);
    }

    if (query.city) {
        array = array.filter(arr => arr.city === query.city);
    }

    res.render('users', {users: array});
});

userRouter.get('/:id', ({params}, res) => {

    const oneUser = users.find(user => user.id === +params.id);

    if (!oneUser){
        const error = 'Такого юзера не існує';
        res.render('error',{error});
    }

    res.render('oneUser',{oneUser});

})

module.exports = userRouter;

