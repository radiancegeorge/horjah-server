require('dotenv').config();
const nodemailer = require('nodemailer');


const sendMail = async (
    message = "hello world",
    email = "radiancegeorge@gmail.com",
    senderEmail = "contact@horjah.com",
    senderPassword = process.env.mail_password,
 ) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.mail_server,
            port: 465,
            secure: true, 
            auth: {
                user: senderEmail, 
                pass: senderPassword,
            }
        });
        let info = await transporter.sendMail({
            from: ` Horjah <${senderEmail}>`,
            to: email,
            subject: senderEmail.split("@")[0],
            html: message,
          });
        return info
    }catch(error){
        throw {
            error: "failed to send mail"
        }
    }
}
module.exports = sendMail