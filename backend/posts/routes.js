import { Router } from 'express';
import { loadPosts } from './controller.js';
const router = Router();

router.get('/load', loadPosts);
//router.post('/create', createPost);
//router.post('/edit', editPost); // edit existing posts

export default router;