




import express from 'express';
import contactInquiries from '../controllers/contactInquiries.js';
import contactFormLimiter from '../middleware/contactFormRateLimiter.js';


const router = express.Router()
router.post('/inquiries', contactFormLimiter, contactInquiries)


export default router


