const { addCoachAvailabilityController, getCoachAllAvailabilityController, updateCoachAvailability } = require('../Controllers/coaches/controller.coachAvailability');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachAvailabilityRouter = require('express').Router();

coachAvailabilityRouter.post('/', verifyUserMiddleware, addCoachAvailabilityController);

coachAvailabilityRouter.get('/', verifyUserMiddleware, getCoachAllAvailabilityController);

coachAvailabilityRouter.patch('/', verifyUserMiddleware, updateCoachAvailability);

module.exports = coachAppointmentRouter;    
