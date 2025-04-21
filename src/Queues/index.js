// queues/index.js
const { Queue } = require('bullmq');
const bullConfig = require('../config/bull.config');

// Create separate queues for different notification types
const bookingQueue = new Queue('booking-notifications', {
  connection: bullConfig.redis,
  defaultJobOptions: bullConfig.queueOptions.defaultJobOptions
});

const paymentQueue = new Queue('payment-notifications', {
  connection: bullConfig.redis,
  defaultJobOptions: bullConfig.queueOptions.defaultJobOptions
});

const reminderQueue = new Queue('reminder-notifications', {
  connection: bullConfig.redis,
  defaultJobOptions: bullConfig.queueOptions.defaultJobOptions
});

const marketingQueue = new Queue('marketing-notifications', {
  connection: bullConfig.redis,
  defaultJobOptions: bullConfig.queueOptions.defaultJobOptions
});

module.exports = {
  bookingQueue,
  paymentQueue,
  reminderQueue,
  marketingQueue
};