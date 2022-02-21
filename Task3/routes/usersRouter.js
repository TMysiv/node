const {Router} = require('express');

const users = require('../db/users');
const userController = require('../controllers/userController');
const checkUser = require('../middlevare/checkUser');

const userRouter = Router();

userRouter.get('/', userController.renderUsers);
userRouter.get('/:id',checkUser, userController.getUserById);
userRouter.post('/:id',userController.deleteUserById);

module.exports = userRouter;

