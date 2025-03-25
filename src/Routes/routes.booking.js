const { createAppointmentController, updateAppointmentPaymentStatusController, updateAppointmentController, getAppointmentHistoryController } = require('../Controllers/users/controller.userAppointment');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const bookingRouter = require('express').Router();

bookingRouter.post('/create-booking', verifyUserMiddleware, createAppointmentController);

bookingRouter.get('/booking-history', verifyUserMiddleware, getAppointmentHistoryController);

bookingRouter.patch('/payment-status', verifyUserMiddleware, updateAppointmentPaymentStatusController);

bookingRouter.patch('/update-booking', verifyUserMiddleware, updateAppointmentController);

module.exports = bookingRouter;    
