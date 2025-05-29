













import express from 'express'
import fs from 'fs'
import path from 'path'




const router = express.Router()




router.post('/donate-next-play-nation-client-error', (req, res) => {
    const { error, time, page } = req.body;

    try {
      const logDir = path.resolve(__dirname, '../errorLogData');
      const logPath = path.join(logDir, 'donateNextPlayErrorLog.log');
  
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
  
      const logEntry = `[${time}] - Page: ${page} - Error: ${error}\n`;
  
      fs.appendFileSync(logPath, logEntry, 'utf8');
      res.status(200).json({ message: 'Client error logged' });
    } catch (err) {
      console.error('Logging Error:', err);
      res.status(500).json({ message: 'Error writing to log file' });
    }
    
})



export default router;