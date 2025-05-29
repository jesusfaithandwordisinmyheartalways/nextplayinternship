






import express from 'express';
import volunteer from '../controllers/volunteer.js';

const router = express.Router();
router.post('/volunteer', volunteer);

export default router;