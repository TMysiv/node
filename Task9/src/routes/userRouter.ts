import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.get('/', userController.getAllUsers);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

export const userRouter = router;
