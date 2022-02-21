const {Router} = require('express');

const users = require('../db/users');
const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.get('/', userController.renderUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/:id',userController.deleteUserById);

module.exports = userRouter;

