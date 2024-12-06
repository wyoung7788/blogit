import { Router } from 'express';
import { loadComments, createComment } from './comment_controller.js';
const router = Router();

router.get('/load', loadComments);
router.post('/create', createComment);


export default router;