





import express from 'express'
import fs from 'fs'
import path from 'path'




const router = express.Router()


router.post('/admin-dashboard-client-error', (req, res) => {
    
    try {
        const { type, message, stack, time } = req.body;
    
        const logDir = path.join(process.cwd(), 'logs');
        const logFile = path.join(logDir, 'adminDashboardError.log');
    
        // Ensure log folder exists
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir);
        }
    
        const logEntry = `[${time}] TYPE: ${type}\nMESSAGE: ${message}\nSTACK: ${stack}\n\n`;
    
        fs.appendFileSync(logFile, logEntry, 'utf8');
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Failed to write log:', error);
        res.status(500).json({ success: false, error: 'Failed to log error' });
      }
    
})



export default router;