const users = require('../db/users')

const checkEmail = (req, res, next) => {
    try {
        const {email} = req.body;

        const sameEmailOfUser = users.find(user => user.email === email);

        if (!sameEmailOfUser) {
            throw new Error('Такого емейлу не існує');
        }

        next();

    } catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = checkEmail;