import { Router } from 'express';
//import {authenticateUser, registerUser} from './login_controller.js';
import { loadPosts } from './controller';
const router = Router();

router.post('/', loadPosts);
//router.post('/create', createPost);
//router.post('/edit', editPost); // edit existing posts

export default router;