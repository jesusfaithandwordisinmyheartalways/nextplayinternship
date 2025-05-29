


import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config()





const clientEmailSend = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASSKEY      
        }

  })



const registerEvent =  async(req, res) => {
        try {
           const { name, email, phoneNumber, textMessage, eventSelect }= req.body;
           const validEmail = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;
           if(!validEmail.test(email)) {
                return res.status(400).json({success: false, message: 'email is not valid'})
           }   
           
           const phoneNumberFormat = /^(\d{3,4}-\d{3}-\d{4})$/;
           if(!phoneNumberFormat.test(phoneNumber)){
              return res.status(400).json({ success: false, message: 'Phone number is not valid. Use format: 123-456-7890 or 1800-123-4568'})  
           }

           if(textMessage.length > 240) {
                return res.status(400).json({ success: false, message: 'You exceeded over the max character length'})
           }

           const clientEmailData = {
                from: `Next Play Nation Event Registration <${process.env.GMAIL_ACCOUNT}>`,
                to: process.env.GMAIL_ACCOUNT,
                subject: `Client event registration From Next Play Nation Website: option: ${eventSelect} `,
                text: `Name: ${name}\nEmail: ${email}\nClient Contact Number: ${phoneNumber}\nEvent: ${eventSelect}\nMessage: ${textMessage}`,
                replyTo: email
           }

           clientEmailSend.sendMail(clientEmailData, (error, information) => {
                if(error) {
                  console.error('Nodemailer email send error', error)
                  return res.status(500).json({success: false, message: 'failed to send email'})      
                } else {
                  return res.status(200).json({success: true, message: 'Registration submitted successfully.'})              
                }
           }) 
        }catch(error) {
              console.error('server error', error)
              return res.status(500).json({ success: false, message: 'error has occurred during the registration'})  
        }
}





export default  registerEvent
