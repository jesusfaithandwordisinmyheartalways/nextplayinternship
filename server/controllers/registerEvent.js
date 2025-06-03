



import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const clientEmailSend = nodemailer.createTransport({
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSKEY,
  },
});

const registerEvent = async (req, res) => {
  try {
    const { name, email, phoneNumber, textMessage, eventSelect } = req.body;

    const validEmail = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;
    if (!validEmail.test(email)) {
      return res.status(400).json({ success: false, message: 'Email is not valid' });
    }

    const phoneNumberFormat = /^(\d{3,4}-\d{3}-\d{4})$/;
    if (!phoneNumberFormat.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is not valid. Use format: 123-456-7890 or 1800-123-4568',
      });
    }

    if (textMessage.length > 240) {
      return res.status(400).json({
        success: false,
        message: 'You exceeded the max character length',
      });
    }

    const clientEmailData = {
      from: `Next Play Nation Event Registration <${process.env.GMAIL_ACCOUNT}>`,
      to: process.env.GMAIL_ACCOUNT,
      subject: `Client Event Registration from Next Play Nation Website: ${eventSelect}`,
      text: `Name: ${name}\nEmail: ${email}\nClient Contact Number: ${phoneNumber}\nEvent: ${eventSelect}\nMessage: ${textMessage}`,
      replyTo: email,
    };

    clientEmailSend.sendMail(clientEmailData, (error, info) => {
      if (error) {
        console.error('Nodemailer email send error', error);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Registration submitted successfully.',
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
};

export default registerEvent;