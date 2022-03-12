import { Router } from 'express';

const router = Router();

router.use('/users');
router.use('/posts');
router.use('/comments');

export const apiRouter = router;
