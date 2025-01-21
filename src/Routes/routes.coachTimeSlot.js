const { createCoachTimeSlotController } = require('../Controllers/controller.coachTimeSlot');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachTimeSlotRouter = require('express').Router();

coachTimeSlotRouter.post('/', verifyUserMiddleware, createCoachTimeSlotController);

module.exports = coachTimeSlotRouter;   