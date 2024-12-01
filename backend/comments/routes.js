import { Router } from 'express';
//import {  } from './controller.js';
const router = Router();

router.get('/load', loadComments);
router.post('/create', createComment);


export default router;