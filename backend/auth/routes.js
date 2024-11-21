import { Router } from 'express';
import {authenticateUser, registerUser} from './login_controller.js';

const router = Router();

router.post('/login', authenticateUser);
router.post('/register', registerUser); //register a new user

export default router;