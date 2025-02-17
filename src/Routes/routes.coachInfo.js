const { createCoachInfoController, getCoachInfoController, updateCoachInfoController } = require('../Controllers/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createCoachBankDetailsController, getCoachBankDetailsController, updateCoachBankDetailsController } = require('../Controllers/controller.coachBankDetails');

const coachInfoRouter = require('express').Router();

coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/search', verifyUserMiddleware, getCoachInfoController);
coachInfoRouter.patch('/:coachId',verifyUserMiddleware, updateCoachInfoController);

console.log("createCoachBankDetailsController:", createCoachBankDetailsController);

coachInfoRouter.post('/account-details',verifyUserMiddleware, createCoachBankDetailsController )
coachInfoRouter.get('/account-details',verifyUserMiddleware, getCoachBankDetailsController )
coachInfoRouter.patch('/change-account-details',verifyUserMiddleware, updateCoachBankDetailsController )

module.exports = coachInfoRouter;