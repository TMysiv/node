const {Router} = require('express');

const loginController = require('../controllers/loginController');
const checkLoginDatas = require('../middlevare/checkLoginDatas');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/',checkLoginDatas, loginController.createUser);

module.exports = loginRouter;
