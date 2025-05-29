





import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router();




const logGeneralInquiryError = (errorData) => {
    try {
        const logFolder = path.join(__dirname, '../logs');
        const logFile = path.join(logFolder, 'generalInquiriesError.log');

        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, { recursive: true });
        }

        const logContent = `[${new Date().toISOString()}] General Inquiry Client Error:\n${JSON.stringify(errorData, null, 2)}\n\n`;

        fs.appendFileSync(logFile, logContent, 'utf8');
    } catch (err) {
        console.error('Failed to write general inquiries error log:', err.message);
    }
};





router.post('/inquiries-client-error', (req, res) => {
    try {
        const errorDetails = req.body?.errorDetails || {};
        logGeneralInquiryError(errorDetails);
        res.status(200).json({ success: true, message: 'Error logged successfully' });
    } catch (error) {
        console.error('Logging route failed:', error.message);
        res.status(500).json({ success: false, message: 'Failed to log error' });
    }
});





export default router;