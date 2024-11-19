import { Router } from 'express';
import {authenticateUser} from './login_controller.js';

const router = Router();

router.post('/login', authenticateUser);

export default router;