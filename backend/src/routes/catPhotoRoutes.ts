import express from 'express';
import multer from 'multer';
import { uploadPhoto } from '../controllers/catPhotosController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/:id', uploadPhoto);

export default router;
