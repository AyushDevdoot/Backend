const { addCoachAvailabilityController, getCoachAllAvailabilityController, updateCoachAvailabilityController } = require('../Controllers/coaches/controller.coachAvailability');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachAvailabilityRouter = require('express').Router();

coachAvailabilityRouter.post('/', addCoachAvailabilityController);

coachAvailabilityRouter.get('/', getCoachAllAvailabilityController);

coachAvailabilityRouter.patch('/', verifyUserMiddleware, updateCoachAvailabilityController);

module.exports = coachAvailabilityRouter;    
