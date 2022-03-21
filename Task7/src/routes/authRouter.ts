import { Router } from 'express';
import { authController } from '../controllers/authController';
import { userMiddleware } from '../middlewares/userMiddleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
router.post('/logout');
router.post('/refresh');

export const authRouter = router;
