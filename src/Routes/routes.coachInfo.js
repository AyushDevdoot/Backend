const { createCoachInfoController, getCoachInfoController, updateCoachInfoController,getProfileController, deleteCoachInfoController } = require('../Controllers/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createCoachBankDetailsController, getCoachBankDetailsController, updateCoachBankDetailsController } = require('../Controllers/controller.coachBankDetails');

const coachInfoRouter = require('express').Router();

coachInfoRouter.get('/profile', verifyUserMiddleware, getProfileController);
coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/search', verifyUserMiddleware, getCoachInfoController);
coachInfoRouter.patch('/',verifyUserMiddleware, updateCoachInfoController);
coachInfoRouter.delete('/delete',verifyUserMiddleware, deleteCoachInfoController)


console.log("createCoachBankDetailsController:", createCoachBankDetailsController);

coachInfoRouter.post('/account-details',verifyUserMiddleware, createCoachBankDetailsController )
coachInfoRouter.get('/account-details',verifyUserMiddleware, getCoachBankDetailsController )
coachInfoRouter.patch('/change-account-details',verifyUserMiddleware, updateCoachBankDetailsController )

module.exports = coachInfoRouter;