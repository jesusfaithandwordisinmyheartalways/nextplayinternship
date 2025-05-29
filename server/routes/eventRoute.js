




import express from 'express';
import registerEvent from '../controllers/registerEvent.js';
import eventRateLimiter from '../middleware/eventRateLimiter.js';


const router = express.Router()
router.post('/events', eventRateLimiter, registerEvent)



export default router