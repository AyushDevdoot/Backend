const { createCoachInfoController, getCoachInfoController, updateCoachInfoController } = require('../Controllers/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createCoachBankDetailsController } = require('../Controllers/controller.coachBankDetails');

const coachInfoRouter = require('express').Router();

coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/search', verifyUserMiddleware, getCoachInfoController);
coachInfoRouter.patch('/:coachId', updateCoachInfoController);

coachInfoRouter.post('/account-details',verifyUserMiddleware, createCoachBankDetailsController )

module.exports = coachInfoRouter;