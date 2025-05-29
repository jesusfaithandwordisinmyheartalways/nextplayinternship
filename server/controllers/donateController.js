





import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config()





const clientDonateEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSKEY
    }
})




clientDonateEmail .verify((error, success) => {
    if (error) {
        console.error('Nodemailer connection failed:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});






    const DonateClient = async (req, res ) => {
        try {
            const { clientName, clientPhone, clientEmail, clientDonateType } = req.body;
            const validEmail = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;
            if(!validEmail.test(clientEmail)) {
                 return res.status(400).json({success: false, message: 'Invalid Email'})
            } 

            const validPhone = /^(\d{3,4}-\d{3}-\d{4})$/;
            if(!validPhone.test(clientPhone)) {
                return res.status(400).json({ success: false, message: 'Invalid Phone Number'})
            }

            if(!clientDonateType) {
                return res.status(400).json({ success: false, message: 'Please Select A Donation Type'})
            }



            const clientDonateForm = {
                from: process.env.GMAIL_ACCOUNT,
                to: process.env.GMAIL_ACCOUNT,
                subject: 'Donation Request From Next Play Nation Website',
                text: `Name:${clientName}\nClient Phone Number:${clientPhone}\nEmail Address:${clientEmail}\nDonation Type Client Wants To Do:${clientDonateType}`,
                replyTo: clientEmail
            }


            clientDonateEmail.sendMail(clientDonateForm, (error, information) => {
                if(error) {
                    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
                } else {
                    return res.status(200).json({ success: true, message: 'Donation Request was Submitted Successfully.' });

                }
            })

        }catch(error) {
            return res.status(500).json({success: false, message: 'Donation Request Error'})  


        }
    }




    export default DonateClient