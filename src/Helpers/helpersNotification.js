require('dotenv').config(); // Load environment variables from .env
const nodemailer = require('nodemailer');


// Create a transporter object using the SMTP configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // SMTP server host
    port: Number(process.env.EMAIL_PORT), // Convert port to a number
    secure: process.env.EMAIL_PORT == 465, // true for port 465, false for others
    auth: {
        user: process.env.EMAIL, // Email address from .env
        pass: process.env.EMAIL_PASSWORD // Email password or app password from .env
    },
    requireTLS: true, // Ensure the connection uses TLS
    connectionTimeout: 10000, // 10 seconds timeout for connection
    greetingTimeout: 5000, // 5 seconds timeout for greeting
});

console.log('SMTP Transporter configuration:', transporter.options);

// Verify the SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails:', success);
    }
});

// Function to send an email
const sendEmail = (email, subject, html) => {
    console.log('Preparing to send email:', {
        to: email,
        subject: subject,
        html: html,
    });

    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: subject, // Email subject
        html: html, // Email content in HTML format
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Loaded environment variables:', {
                EMAIL_HOST: process.env.EMAIL_HOST,
                EMAIL_PORT: process.env.EMAIL_PORT,
                EMAIL: process.env.EMAIL,
            });

            console.error("Mail Error:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};

module.exports = {
    sendEmail
};
