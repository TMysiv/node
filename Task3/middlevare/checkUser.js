const users = require("../db/users");

const checkUser = ({params}, res, next) => {
    try {
        const oneUser = users.find(user => user.id === +params.id);

        if (!oneUser) {
            throw new Error('Такого юзера не існує');
        };

        next()
    } catch (e) {
        res.redirect(`/error?error=${e.message}`);
    };
}

module.exports = checkUser;