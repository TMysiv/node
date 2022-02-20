const {Router} = require('express');
const signInController = require('../controllers/signInController')

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);
signInRouter.post('/', signInController.checkUser);

module.exports = signInRouter;