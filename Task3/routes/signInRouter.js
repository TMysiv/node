const {Router} = require('express');

const signInController = require('../controllers/signInController');
const checkEmailAndPassword = require('../middlevare/checkSignIn')

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);
signInRouter.post('/',checkEmailAndPassword, signInController.checkUser);

module.exports = signInRouter;