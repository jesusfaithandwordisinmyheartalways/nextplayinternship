




import express from 'express';
import contactInquiries from '../controllers/contactInquiries.js';



const router = express.Router()
router.post('/inquiries', contactInquiries)


export default router


