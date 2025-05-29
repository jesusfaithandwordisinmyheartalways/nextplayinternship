




import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()





const logEventRegisterError = (errorData) => {
    try {
      const logFolder = path.join(__dirname, '../logs');
      const logFile = path.join(logFolder, 'eventRegisterError.log');
  
      if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, { recursive: true });
      }
  
      const logContent = `[${new Date().toISOString()}] EventRegister Client Error:\n${JSON.stringify(errorData, null, 2)}\n\n`;
  
      fs.appendFileSync(logFile, logContent, 'utf8');
    } catch (err) {
      console.error('Failed to write event register error log:', err.message);
    }
  };






router.post('/event-register-client-side-error', (req, res) => {
    try {
        const errorDetails = req.body?.errorDetails || {};
        logEventRegisterError(errorDetails);
        res.status(200).json({ success: true, message: 'Error logged successfully' });
      } catch (error) {
        console.error('Logging route failed:', error.message);
        res.status(500).json({ success: false, message: 'Failed to log error' });
      }
})






export default router;