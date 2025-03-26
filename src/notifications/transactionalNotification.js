const mongoose = require('mongoose');
const { base } = require('../Models/models.coachBankDetails');

const baseNotification = new mongoose.Schema({
         recipient:{
            user_id:{
                type:Schema.Type.ObjectId,
                ref:'user',
                required:true

            },
            device_tokens:[{type:String}],
            email:{type:String},
            phone:{type:String},

         },
         sender:{
            type:{
                type:String,
                enum:['system','coach'],
                default:'system'
            }
         },
         content: {
            title: { type: String, required: true },
            body: { type: String, required: true },
            deep_link: { type: String }
          },
          delivery:{
            channels:[{ 
                type: String,
                 enum:['push','email','sms'],
                required:true},
            ],
            attempts:{
                type:Number,
                default:0
            }
          }

})

const bookingNotification = new Schema({
    ...baseNotification,
    bookingData:{
        booking_id: {
            type:Schema.Types.ObjectId,
            ref:'booking',
            required:true
        },
        coach_id:{
            type:Schema.Types.ObjectId,
            ref:'coach',
        },
        coach_name:{
            type:String,
        },
        session_date:{
            type:Date
        },
        session_duration:{
            type:Number
        },
        session_start:{
            type:Time,
        },
        session_end:{
            type:Time,
        },
        notification_type: {
            type: String,
            enum: ['booking_created', 'booking_confirmed', 'booking_cancelled', 'booking_rescheduled'],
            required: true
          }
    }
})

const paymentNotification = new Schema({
    ...baseNotification,
    payment_data: {
      payment_id: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
      booking_id: { type: Schema.Types.ObjectId, ref: 'booking' },
      amount: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      payment_method: { type: String },
      transaction_id: { type: String }
    },
    notification_type: {
      type: String,
      enum: ['payment_received', 'payment_failed', 'refund_processed', 'invoice_generated'],
      required: true
    }
  });

const reminderNotification = new Schema({
    ...baseNotification , 
    reminderData:{
        booking_id:{
            type:Schema.Types.ObjectId,
            ref:'booking',
            required:true
        },
        session_date:{
            type:Date,
            required:true
        },
        time_until_session:{
            type:Number
        },
        notification_type: {
            type: String,
            enum: ['reminder_24h', 'reminder_1h', 'reminder_15m', 'custom_reminder'],
            required: true
          }
}
})

const BookingNotification = mongoose.model('BookingNotification', bookingNotification);
const PaymentNotification = mongoose.model('PaymentNotification', paymentNotification);
const ReminderNotification = mongoose.model('ReminderNotification', reminderNotification);

module.exports = {
    BookingNotification,
    PaymentNotification,
    ReminderNotification
}