import { Router } from 'express';

import { authController } from '../controllers';
import { userMiddleware, authMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', userMiddleware.validateRegistr, authController.registration);
router.post('/login', userMiddleware.validateLogin, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/forgotPassword', userMiddleware.validEmail, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', userMiddleware.validPassword, authMiddleware.checkActiveToken, authController.setPassword);

export const authRouter = router;
