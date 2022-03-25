import { Router } from 'express';

import { authController } from '../controllers';
import { userMiddleware, authMiddleware, tokenMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', userMiddleware.validateRegistr, authController.registration);
router.post('/login', userMiddleware.validateLogin, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', tokenMiddleware.validateToken, authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', tokenMiddleware.validateToken, authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
