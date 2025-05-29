



// send client errors from the client side Admin component to the server for security


import express from 'express'
import fs from 'fs'
import path from 'path'



const router = express.Router()


router.post('/admin-client-error', (req, res) => {
    const adminLogData  = {
        ...req.body,
        ip: req.ip
    }

    const adminFileLogPath = path.join(__dirname, 'admin-client-login-error.log')

   try {
    fs.appendFileSync(logFilePath, JSON.stringify(adminLogData) + '\n');
    res.status(200).json({ success: true });

   }catch(error) {
    console.error('Failed to write error log:', err);
    res.status(500).json({ success: false, message: 'Log write failed' });
   }
    
})



export default router;