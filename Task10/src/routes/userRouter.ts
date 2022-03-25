import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getAllUsers);
router.patch('/:id', userMiddleware.validateId, userController.updateUserById);
router.delete('/:id', userMiddleware.validateId, userController.deleteUserById);

export const userRouter = router;
