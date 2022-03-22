import { Router } from 'express';
import { authController } from '../controllers/index';
import { userMiddleware } from '../middlewares/userMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;