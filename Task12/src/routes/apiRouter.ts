import { Router } from 'express';

import {
    userRouter, authRouter, commentRouter, postRouter,studentRouter
} from './index';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

export const apiRouter = router;
