



import express from 'express';
import AdminLoginOutFunction from '../controllers/adminLogoutController.js';


const router = express.Router()
router.post('/admin-logout', AdminLoginOutFunction)


export default router