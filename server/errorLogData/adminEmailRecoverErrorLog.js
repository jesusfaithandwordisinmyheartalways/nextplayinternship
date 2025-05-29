




import express from 'express';
import fs from 'fs';
import path from 'path';




const router = express.Router();





const logAdminEmailRecoveryError = (errorData) => {
    try {
        const logFolder = path.join(__dirname, '../logs');
        const logFile = path.join(logFolder, 'adminEmailRecoverError.log');

        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, { recursive: true });
        }

        const logContent = `[${new Date().toISOString()}] Admin Email Recovery Client Error:\n${JSON.stringify(errorData, null, 2)}\n\n`;

        fs.appendFileSync(logFile, logContent, 'utf8');
    } catch (err) {
        console.error('Failed to write admin email recovery error log:', err.message);
    }
};





router.post('/admin-email-recover-client-error', (req, res) => {
    try {
        const errorDetails = req.body?.errorDetails || {};
        logAdminEmailRecoveryError(errorDetails);
        res.status(200).json({ success: true, message: 'Error logged successfully' });
    } catch (error) {
        console.error('Logging route failed:', error.message);
        res.status(500).json({ success: false, message: 'Failed to log error' });
    }
});





export default router;