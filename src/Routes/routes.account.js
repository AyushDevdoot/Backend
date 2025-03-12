const { createAccountController, createCoachAccountController, createUserAccountController, getUserDetailsController, loginUserController, verifyOtpController, forgetPasswordController, resendOtpToEmail, changePasswordController } = require('../Controllers/controller.authUserCoach');
const { verifyUserMiddleware, verifytUserOtpMiddleware } = require('../Middleware/userAuth');

const accountRouter = require('express').Router();

accountRouter.post('/signup', createAccountController);
accountRouter.post('/coach/signup', createCoachAccountController);
accountRouter.post('/user/signup', createUserAccountController);
accountRouter.post('/login', loginUserController);
accountRouter.get('/details', verifyUserMiddleware, getUserDetailsController);
accountRouter.post('/otp', verifytUserOtpMiddleware, verifyOtpController);
// accountRouter.post('/send-otp', sendOtpToEmail);
accountRouter.post('/resend-otp',resendOtpToEmail)
accountRouter.post('/forget',  forgetPasswordController);
accountRouter.patch('/change', verifyUserMiddleware, changePasswordController);


module.exports = accountRouter;
