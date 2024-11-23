import { Router } from 'express';
import { loadPosts, createPost } from './controller.js';
const router = Router();

router.get('/load', loadPosts);
router.post('/create', createPost);
//router.put('/edit/:postId', editPost); // edit existing posts
//router.delete(/delete/:postId)

export default router;