const users = require('../db/users')

const checkEmail = (req, res, next) => {
    try {
        const {email,password} = req.body;

        const sameEmailOfUser = users.find(user => user.email === email && user.password === password);

        if (!sameEmailOfUser) {
            throw new Error('Помилковий емейл чи пароль');
        }

        next();

    } catch (e) {
        res.redirect(`/error?error=${e.message}`)
    }
}

module.exports = checkEmail;