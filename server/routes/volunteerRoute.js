






import express from 'express';
import volunteer from '../controllers/volunteer.js';
import volunteerRateLimiter from '../middleware/volunteerRateLimiter.js';


const router = express.Router();
router.post('/volunteer', volunteerRateLimiter, volunteer);

export default router;