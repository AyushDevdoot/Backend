const nodemailer = require('nodemailer');

// SMTP configuration
const smtpConfig = {
    host: 'smtp-relay.brevo.com', // Hardcoded SMTP server host
    port: 587, // Hardcoded SMTP server port
    auth: {
        user: '840e37001@smtp-brevo.com', // Hardcoded email address
        pass: 'tkvOFn7Q0cyAVh9w', // Hardcoded email password
    },
    requireTLS: true, // Ensure the connection uses TLS
    connectionTimeout: 10000, // 10 seconds timeout for connection
    greetingTimeout: 5000, // 5 seconds timeout for greeting
    debug: true,
};

// Create a transporter object using the SMTP configuration
const transporter = nodemailer.createTransport(smtpConfig);

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
        from: smtpConfig.auth.user, // Sender email address
        to: email, // Recipient email address
        subject: subject, // Email subject
        html: html, // Email content in HTML format
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Loaded configuration:', smtpConfig);

            console.error("Mail Error:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};

module.exports = {
    sendEmail
};
