require('dotenv').config(); // Load environment variables from .env
const nodemailer = require('nodemailer');

// Validate environment variables
if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    console.error("Missing required environment variables. Please check your .env file.");
    process.exit(1);
}

// Create a transporter object using the SMTP configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // SMTP server host
    port: parseInt(process.env.EMAIL_PORT, 10), // SMTP server port
    secure: process.env.EMAIL_PORT === "465", // Use true for port 465, false otherwise
    auth: {
        user: process.env.EMAIL, // Email address from .env
        pass: process.env.EMAIL_PASSWORD, // Email password from .env
    },
    requireTLS: true, // Ensure the connection uses TLS
    connectionTimeout: 10000, // 10 seconds timeout for connection
    greetingTimeout: 5000, // 5 seconds timeout for greeting
});

// Verify the SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error.message);
    } else {
        console.log('SMTP Server is ready to send emails:', success);
    }
});

// Function to send an email
const sendEmail = async (email, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL, // Sender email address
            to: email, // Recipient email address
            subject: subject, // Email subject
            html: html, // Email content in HTML format
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = {
    sendEmail
};
