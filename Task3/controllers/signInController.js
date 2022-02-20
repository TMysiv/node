const users = require("../db/users");

class SignInController{

    renderSignIn(req,res){
        res.render('signIn');
    }

    checkUser({body},res){
        const user = users.find(user => user.email === body.email && user.password === body.password);

        if (!user) {
            const error = 'не вірний емейл чи пароль';
            res.render('error', {error});
        }

        res.redirect(`users/${user.id}`)
    }
}

module.exports = new SignInController();