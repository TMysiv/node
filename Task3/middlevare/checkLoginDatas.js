const checkLoginDatas = (req, res, next) => {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;

        if (!firstName || firstName.length < 4) {
            throw new Error('Поле Імя повинно бути заповнено або довжина поля менше 4');
        }

        if (!lastName || lastName.length < 4) {
            throw new Error('Поле Прізвище повинно бути заповнено або довжина поля менше 4');
        }

        if (!email || !email.includes('@') || email.length < 5) {
            throw new Error('Поле Емейл введено не коректно');
        }

        if (!password || password.length < 8) {
            throw new Error('Поле Пароль повинно містити мінімум 8 символів');
        }

        if (!age || age < 18) {
            throw new Error('Поле Вік введено не коректно');
        }

        if (!city){
            throw new Error('Поле Місто введено не коректно');
        }

        next();

    } catch (e) {
        res.redirect(`/error?error=${e.message}`)
    }
}

module.exports = checkLoginDatas;