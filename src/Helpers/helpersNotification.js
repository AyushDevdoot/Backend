const nodemailer = require('nodemailer');
const Config = require("../Configs/Config.json")

const transporter = nodemailer.createTransport({
    host: Config.EMAIL_HOST,
    port: Config.EMAIL_PORT,
    auth: {
        user: Config.EMAIL,
        pass: Config.EMAIL_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails:', success);
    }
});

const mailOptions = {
    from: Config.EMAIL,
};


const sendEmail = (email, subject, html) => {
    mailOptions.to = email;
    mailOptions.subject = subject;
    mailOptions.html = html;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Mail Error", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
module.exports = {
    sendEmail
}