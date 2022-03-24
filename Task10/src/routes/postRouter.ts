import { Router } from 'express';

import { postController } from '../controllers';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:userId', postController.getPostByUserId);
router.patch('/:id', postController.updatePost);

export const postRouter = router;
