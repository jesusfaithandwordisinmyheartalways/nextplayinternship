

import dotenv from 'dotenv';
import AdminLoginUser from '../models/adminLoginModel.js';
import nodemailer from 'nodemailer'



dotenv.config()







const AdminRecoveryEmail = async (req, res ) => {
    try {
        const { email } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i
        if(!email || !emailRegex.test(email)){
            return res.status(400).json({success: false, message: 'Invalid Email'})
        }
        const AdminEmailExist = await AdminLoginUser.findOne({ email })
        if(!AdminEmailExist){
            return res.status(404).json({ success: false, message: 'Admin Email Does Not Exist'})
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ACCOUNT,
                pass: process.env.GMAIL_PASSKEY
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: email,
            subject: 'Next Play Nation Admin Login Credentials',
            text: `Admin Login Credentials: \n\nUsername:${process.env.ADMIN_USERNAME}\nPassword:${process.env.ADMIN_PASSWORD}\nEmail:${process.env.ADMIN_EMAIL}`
        }

        await transporter.sendMail(mailOptions)
        res.status(200).json({ success: true, message: 'Admin Credentials sent successfully' });
    }catch(error) {
        console.error('Recovery Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }
}



export default AdminRecoveryEmail