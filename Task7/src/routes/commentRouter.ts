import { Router } from 'express';

import { commentController } from '../controllers/commentController';

const router = Router();

router.get('/', commentController.getAllComment);
router.post('/', commentController.createComment);
router.get('/:userId', commentController.getCommentByUserId);
router.patch('/action', commentController.updateCommentByAction);

export const commentRouter = router;
