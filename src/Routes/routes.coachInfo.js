const { createCoachInfoController, getCoachInfoController, updateCoachInfoController } = require('../Controllers/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachInfoRouter = require('express').Router();

coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/search', verifyUserMiddleware, getCoachInfoController);
coachInfoRouter.patch('/:coachId', updateCoachInfoController);

module.exports = coachInfoRouter;