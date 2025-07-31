import express from 'express';
import { addCat } from '../controllers/catcontroller';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/addCat', authMiddleware, addCat);

export default router;