import express from 'express';
import { getEvent, addEvent, deleteEvent} from '../controllers/catEventsController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/getEvent', authMiddleware, getEvent);
router.post('/addEvent', authMiddleware, addEvent);
router.delete('/deleteEvent', authMiddleware, deleteEvent);

export default router;
