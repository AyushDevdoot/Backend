require('dotenv').config(); // Load environment variables from .env
const nodemailer = require('nodemailer');

// Create a transporter object using the SMTP configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // SMTP server host
    port: parseInt(process.env.EMAIL_PORT, 10), // SMTP server port (convert string to number)
    secure: false, // Set to true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL, // Email address from .env
        pass: process.env.EMAIL_PASSWORD // Email password or app password from .env
    }
});

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
    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: subject, // Email subject
        html: html, // Email content in HTML format
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Mail Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

module.exports = {
    sendEmail
};
