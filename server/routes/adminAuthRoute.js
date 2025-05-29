




import express from 'express';
import dotenv from 'dotenv';
import adminAuthentication from '../middleware/adminAuthentication.js';



dotenv.config();

const router = express.Router();




router.get('/admin-authentication', adminAuthentication, (req, res) => {
  res.json({ authenticated: true, admin: req.admin });
});



export default router



