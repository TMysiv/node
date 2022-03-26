import { Router } from 'express';

import { postController } from '../controllers';
import { userMiddleware, postMiddleware } from '../middlewares';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postMiddleware.validatePost, postController.createPost);
router.get('/:userId', userMiddleware.validateId, postController.getPostByUserId);
router.patch('/:id', userMiddleware.validateId, postController.updatePost);

export const postRouter = router;
