const {Router} = require('express');

const loginController = require('../controllers/loginController');
const checkLogin = require('../middlevare/checkLogin')

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/',checkLogin.checkLoginDatas,checkLogin.checkEmail, loginController.createUser);

module.exports = loginRouter;
