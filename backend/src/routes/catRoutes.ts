import express from 'express';
import { addCat, getCat} from '../controllers/catController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/addCat', authMiddleware, addCat);
router.get('/getCat', authMiddleware, getCat);

export default router;