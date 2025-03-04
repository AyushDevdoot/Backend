const { createAccountController, getUserDetailsController, loginUserController, verifyOtpController, forgetPasswordController, resendOtpToEmail, changePasswordController } = require('../Controllers/controller.authUserCoach');
const { verifyUserMiddleware, verifytUserOtpMiddleware } = require('../Middleware/userAuth');

const userRouter = require('express').Router();

userRouter.post('/signup', createAccountController);
userRouter.post('/login', loginUserController);
userRouter.get('/details', verifyUserMiddleware, getUserDetailsController);
userRouter.post('/otp', verifytUserOtpMiddleware, verifyOtpController);
// userRouter.post('/send-otp', sendOtpToEmail);
userRouter.post('/resend-otp',resendOtpToEmail)
userRouter.post('/forget',  forgetPasswordController);
userRouter.patch('/change', verifyUserMiddleware, changePasswordController);


module.exports = userRouter;
