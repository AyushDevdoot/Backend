// services/notificationService.js
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const firebase = require('firebase-admin');
const config = require('../config/notification.config');

// Initialize Firebase Admin (for push notifications)
firebase.initializeApp({
  credential: firebase.credential.cert(config.firebase.serviceAccount)
});

// Initialize email transporter
const emailTransporter = nodemailer.createTransport(config.email);

// Initialize SMS client
const smsClient = twilio(config.twilio.accountSid, config.twilio.authToken);

// Send push notification
async function sendPushNotification(tokens, title, body, data = {}) {
  if (!tokens || tokens.length === 0) return { success: false, error: 'No device tokens provided' };
  
  try {
    const message = {
      notification: { title, body },
      data: { ...data, click_action: 'FLUTTER_NOTIFICATION_CLICK' },
      tokens: Array.isArray(tokens) ? tokens : [tokens]
    };
    
    const response = await firebase.messaging().sendMulticast(message);
    return { 
      success: true, 
      successCount: response.successCount,
      failureCount: response.failureCount
    };
  } catch (error) {
    console.error('Push notification error:', error);
    return { success: false, error: error.message };
  }
}

// Send email
async function sendEmail(to, subject, html) {
  try {
    const info = await emailTransporter.sendMail({
      from: config.email.from,
      to,
      subject,
      html
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}

// Send SMS
async function sendSMS(to, body) {
  try {
    const message = await smsClient.messages.create({
      body,
      from: config.twilio.phoneNumber,
      to
    });
    
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('SMS send error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendPushNotification,
  sendEmail,
  sendSMS
};