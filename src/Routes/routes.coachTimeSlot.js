const { createCoachTimeSlotController,getCoachTimeSlotController } = require('../Controllers/controller.coachTimeSlot');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachTimeSlotRouter = require('express').Router();

coachTimeSlotRouter.post('/', verifyUserMiddleware, createCoachTimeSlotController);
coachTimeSlotRouter.get('/:coachId',getCoachTimeSlotController);

module.exports = coachTimeSlotRouter;   