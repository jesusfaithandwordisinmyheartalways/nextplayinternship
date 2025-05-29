





import express from 'express';
import DonateClient from '../controllers/donateController.js';
import { donateRequestLimit } from '../middleware/donateRequestLimit.js';




const router = express.Router()
router.post('/donate-client', donateRequestLimit, DonateClient)



export default router