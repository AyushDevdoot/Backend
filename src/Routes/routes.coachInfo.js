const { createCoachInfoController, getCoachInfoController, getCoachInfoByIdController, updateCoachInfoController } = require('../Controllers/coaches/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachInfoRouter = require('express').Router();

coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/:coachId', verifyUserMiddleware ,getCoachInfoByIdController);
coachInfoRouter.get('/search', getCoachInfoController);
coachInfoRouter.patch('/:coachId', updateCoachInfoController);

module.exports = coachInfoRouter;
