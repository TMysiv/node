let users = require("../db/users");

class UserController {

    renderUsers({query},res){
        let array = [...users];

        if (query.age) {
            array = array.filter(arr => arr.age === query.age);
        }

        if (query.city) {
            array = array.filter(arr => arr.city === query.city);
        }

        res.render('users', {users: array});
    };

    getUserById({params},res){
        const oneUser = users.find(user => user.id === +params.id);
        res.render('oneUser',{oneUser});
    }

    deleteUserById({ params }, res)  {

        users = users.filter(user => user.id !== +params.id);

        res.redirect('/users');
    }
}

module.exports =new UserController();