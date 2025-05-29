



import express from 'express';
import AdminLoginFunction from '../controllers/adminController.js';
import { adminLoginRateLimit } from '../middleware/adminLoginLimit.js';


``
const router = express.Router()
router.post('/admin-login', adminLoginRateLimit,  AdminLoginFunction)


export default router
