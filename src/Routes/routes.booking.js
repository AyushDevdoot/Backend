const { createAppointmentController, updateAppointmentPaymentStatusController, updateAppointmentController, getAppointmentHistoryController } = require('../Controllers/users/controller.userAppointment');
const { getCoachWeeklyAvailableSlotController, initializeBookingController, resolveBookingController } = require('../Controllers/booking/controller.bookingTimeSlots');
const { getBookingRequestController, updateBookingRequestController } = require('../Controllers/coaches/controller.bookingRequest');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const bookingRouter = require('express').Router();

bookingRouter.get('/appointment-slot', getCoachWeeklyAvailableSlotController);

bookingRouter.post('/appointment-slot/initialize', initializeBookingController);

bookingRouter.post('/appointment-slot/resolve', resolveBookingController);

bookingRouter.get('/appointment-slot/requests', getBookingRequestController);

bookingRouter.patch('/appointment-slot/request-action', updateBookingRequestController);

//bookingRouter.get('/booking-history', verifyUserMiddleware, getAppointmentHistoryController);

//bookingRouter.patch('/payment-status', verifyUserMiddleware, updateAppointmentPaymentStatusController);

//bookingRouter.patch('/update-booking', verifyUserMiddleware, updateAppointmentController);

module.exports = bookingRouter;    
