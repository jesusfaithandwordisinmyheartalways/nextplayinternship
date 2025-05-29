



import dotenv from 'dotenv';
import nodemailer from 'nodemailer'


dotenv.config()



const clientContactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSKEY      
    }
})


clientContactEmail.verify((error, success) => {
    if (error) {
        console.error('Nodemailer connection failed:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});




const contactInquiries = async (req, res) => {
    try {
        const { name, lastName, telephone, textMessage, emailAddress } = req.body;

        const validEmail = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;
        if(!validEmail.test(emailAddress)) {
             return res.status(400).json({success: false, message: 'email is not valid'})
        } 

         
        const phoneNumberFormat = /^(\d{3,4}-\d{3}-\d{4})$/;
        if(!phoneNumberFormat.test(telephone)){
           return res.status(400).json({ success: false, message: 'Phone number is not valid. Use format: 123-456-7890 or 1800-123-4568'})  
        }


        if(textMessage.length > 300) {
            return res.status(400).json({ success: false, message: 'You exceeded over the max character length'})
       }


       const clientEmailData = {
        from: `Client Contact Next Play Nation Inquiry" <${process.env.GMAIL_ACCOUNT}>`,
        to: process.env.GMAIL_ACCOUNT,
        subject: `Client Inquiry Submit From Next Play Nation Website`,
        text: `First Name: ${name}\nLast Name: ${lastName}\nEmail: ${emailAddress}\nClient Contact Number: ${telephone}\nMessage: ${textMessage}`,
        replyTo: emailAddress  
    };


    clientContactEmail.sendMail(clientEmailData, (error, info) => {
        if (error) {
            console.error('Nodemailer email send error:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
        } else {
            console.log('Email sent: ', info.response);
            return res.status(200).json({ success: true, message: 'Contact form submitted successfully.' });
        }
    });

    
    }catch(error) {
        console.error(' contact form server error', error)
        return res.status(500).json({success: false, message: 'error has occurred during the contact form submission'})  

    }
}




export default contactInquiries
