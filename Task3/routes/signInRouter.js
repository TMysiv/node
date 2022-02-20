const {Router} = require('express');
const signInController = require('../controllers/signInController');
const checkEmail = require('../middlevare/checkEmail')

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);
signInRouter.post('/',checkEmail, signInController.checkUser);

module.exports = signInRouter;