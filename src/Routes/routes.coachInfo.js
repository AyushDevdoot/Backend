const { createCoachInfoController, getCoachInfoController, updateCoachInfoController } = require('../Controllers/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createCoachBankDetailsController, getCoachBankDetailsController } = require('../Controllers/controller.coachBankDetails');

const coachInfoRouter = require('express').Router();

coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/search', verifyUserMiddleware, getCoachInfoController);
coachInfoRouter.patch('/:coachId', updateCoachInfoController);

console.log("createCoachBankDetailsController:", createCoachBankDetailsController);

coachInfoRouter.post('/account-details',verifyUserMiddleware, createCoachBankDetailsController )
coachInfoRouter.get('/account-details',verifyUserMiddleware, getCoachBankDetailsController )

module.exports = coachInfoRouter;