const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createCoachBankDetailsController } = require('../Controllers/controller.coachBankDetails');

const coachBankRouter = require('express').Router();

coachBankRouter.post('/account-details',verifyUserMiddleware, createCoachBankDetailsController )