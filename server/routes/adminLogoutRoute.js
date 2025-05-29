



import express from 'express';
import AdminLoginOutFunction from '../controllers/adminLogoutController.js';


const router = express.Router()
router.post('/admin-logout', AdminLoginOutFunction, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error while logging out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'Logged out successfully' });
    });
})


export default router