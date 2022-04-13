import { Router } from 'express';

import { commentController } from '../controllers';
import { commentMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.get('/', commentController.getAllComment);
router.post('/', commentMiddleware.validateComment, commentController.createComment);
router.get('/:userId', userMiddleware.validateId, commentController.getCommentByUserId);
router.patch('/action', commentController.updateCommentByAction);

export const commentRouter = router;
