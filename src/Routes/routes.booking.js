const { createAppointmentController, updateAppointmentPaymentStatusController, updateAppointmentController, getAppointmentHistoryController } = require('../Controllers/users/controller.userAppointment');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const bookingRouter = require('express').Router();

coachAvailabilityRouter.post('/create-booking', verifyUserMiddleware, createAppointmentController);

coachAvailabilityRouter.get('/booking-history', verifyUserMiddleware, getAppointmentHistoryController);

coachAvailabilityRouter.patch('/payment-status', verifyUserMiddleware, updateAppointmentPaymentStatusController);

coachAvailabilityRouter.patch('/update-booking', verifyUserMiddleware, updateAppointmentController);

module.exports = bookingRouter;    
