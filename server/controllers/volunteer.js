



import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const clientVolunteerEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSKEY,
  },
});

clientVolunteerEmail.verify((error) => {
  if (error) console.error('Nodemailer connection failed:', error);
  else console.log('Ready to send emails');
});






const volunteer = async (req, res) => {
    try {
      const { fullName, email, phone, role, experience, whyVolunteer } = req.body;
  
      const validEmail = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;
      const phoneRegex = /^(\d{3,4}-\d{3}-\d{3,4}|\d{3}-\d{3}-\d{4})$/;
  
      if (!validEmail.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
      }
  
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
      }
  
      if (!role) {
        return res.status(400).json({ success: false, message: 'Role must be selected.' });
      }
  
      const mailOptions = {
        from: process.env.GMAIL_ACCOUNT,
        to: process.env.GMAIL_ACCOUNT,
        subject: 'New Volunteer Submission From Next Play Nation Website',
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}\nExperience: ${experience}\nWhy Volunteer: ${whyVolunteer}`,
        replyTo: email || process.env.GMAIL_ACCOUNT
      };
  


      clientVolunteerEmail.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Email error:', err);
          return res.status(500).json({ success: false, message: 'Email sending failed.' });
        }
        return res.status(200).json({ success: true, message: 'Submitted successfully!' });
      });


    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };





export default volunteer;