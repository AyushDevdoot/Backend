const { createCoachInfoController, getCoachInfoController, updateCoachInfoController } = require('../Controllers/controller.coachInfo');
const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createCoachBankDetailsController, getCoachBankDetailsController, updateCoachBankDetailsController } = require('../Controllers/controller.coachBankDetails');

const coachInfoRouter = require('express').Router();

coachInfoRouter.post('/', verifyUserMiddleware, createCoachInfoController);
coachInfoRouter.get('/search', verifyUserMiddleware, getCoachInfoController);
coachInfoRouter.patch('/:coachId', updateCoachInfoController);

console.log("createCoachBankDetailsController:", createCoachBankDetailsController);

coachInfoRouter.post('/account-details',verifyUserMiddleware, createCoachBankDetailsController )
coachInfoRouter.get('/account-details',verifyUserMiddleware, getCoachBankDetailsController )
// coachInfoRouter.patch('/change-account-details',verifyUserMiddleware, updateCoachBankDetailsController )

const origVerifyMiddleware = verifyUserMiddleware;
coachInfoRouter.patch('/account-details', 
    (req, res, next) => {
        console.log('Before verify middleware');
        origVerifyMiddleware(req, res, next);
    }, 
    (req, res, next) => {
        console.log('After verify middleware');
        updateCoachBankDetailsController(req, res, next);
    }
);

module.exports = coachInfoRouter;