import express from 'express';
import { getUser, login, register } from '../controllers/user.controller';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/getUser', authMiddleware, getUser)

export default router;
