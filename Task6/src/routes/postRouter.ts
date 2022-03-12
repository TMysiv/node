import { Router } from 'express';

import { postController } from '../controllers/postController';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:userId', postController.getPostById);
router.patch('/:id', postController.updatePost);

export const postRouter = router;
