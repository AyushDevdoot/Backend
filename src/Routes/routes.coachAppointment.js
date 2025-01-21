const { createCoachAppointmentController, getAllCoachAppointmentsController } = require('../Controllers/controller.coachAppointment');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachAppointmentRouter = require('express').Router();

coachAppointmentRouter.post('/', verifyUserMiddleware, createCoachAppointmentController);
coachAppointmentRouter.get('/', verifyUserMiddleware, getAllCoachAppointmentsController);

module.exports = coachAppointmentRouter;    