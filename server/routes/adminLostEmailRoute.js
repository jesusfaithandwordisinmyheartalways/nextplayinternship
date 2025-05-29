




import express from 'express';
import AdminRecoveryEmail from '../controllers/adminRecoveryEmail.js';
import { adminRecoveryLimiter } from '../middleware/adminEmailRecovery.js';




const router = express.Router()
router.post('/admin-recover', adminRecoveryLimiter, AdminRecoveryEmail)



export default router