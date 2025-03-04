const bcrypt = require("bcrypt");
const logger = require("../Helpers/loggerFunction");
const { createAuthDto, validateAuthDto } = require('../DTOs/auth.dto');
const { sendEmail } = require("../Helpers/helpersNotification");
const { saltRounds, html, forgothtml } = require("../Helpers/helpers.constant");
const { createUserDto, validateCreateUserDto, getUserProfileDto } = require("../DTOs/userInfo.dto");
const { createCoachDto, validateCreateCoachDto, getCoachProfileDto } = require('../DTOs/coachInfo.dto');
const { sendResponse, generateToken, generateOTP } = require("../Helpers/helpers.commonFunc");
const { createUserInfoServices,  userExistsByMobileServices, getUserInfoByMobileServices } = require("../Services/services.userInfo");
const { createCoachInfoServices, coachExistsByMobileServices, getCoachInfoByMobileServices } = require('../Services/services.coachInfo');
const { createUserCoachAuthService, getAuthDetailsByEmailService, getUserCoachAuthDetailsByEmailService, updateUserCoachAuthDetailsByIdService } = require('../Services/services.authUserCoach');
require('dotenv').config(); 

//TODO: Reminder about timeZone 
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Fetch user by email
        const user = await getUserCoachAuthDetailsByEmailService(email.toLowerCase());
        if (!user || user.isDisabled) {
            return sendResponse(res, null, 400, false, "Invalid credentials");
        }
        // Check if the user is verified
        if (!user.isActive) {
            return sendResponse(res, null, 400, false, "User not verified");
        }
        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendResponse(res, null, 400, false, "Invalid credentials");
        }
        // Generate token if password is valid and user is verified
        const accessToken = await generateToken({
            user: {
                _id: user._id,
                userType: user.references[1]?.referenceType || user.references[0]?.referenceType, 
                email: user.email,
            },
            isVerified: user.isVerified,
        });
        let response_data = {token: accessToken};
        for (let ref of user.references){
            if (ref.referenceType === 'coachinfo'){
                response_data[ref.referenceType] = getCoachProfileDto(ref.reference)
            }else{
                response_data[ref.referenceType] = getUserProfileDto(ref.reference)
            }
        }
        sendResponse(res, null, 200, true, "Login successful", response_data);
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
    }
};

const createAccountController = async (req, res) => {
    try {
        // Validate request body
        let data_coach = {};
        let errors = {};
        if (!req.body.user_type){
            sendResponse(res, null, 422, false, 'Error Invaild user type!');
            return
        }
        errors = validateAuthDto(req.body);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        let data_user = createUserDto(req.body);
        errors = validateCreateUserDto(data_user);

        if (req.body.user_type.includes('coach')){
            data_coach = createCoachDto(req.body)
            errors = validateCreateCoachDto(data_coach);
        }
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        let userDetails = await getAuthDetailsByEmailService(req.body.email);
        console.log("User details fetched:", userDetails);
        let userExists = await userExistsByMobileServices(data_user.mobile)

        if (userDetails) {
            if (userDetails.isVerified) {
                sendResponse(res, null, 400, false, "User already exists");
                return;
            } else {
                //TODO:note to Self Remeber to remove it 
                console.log("User exists but not verified:", userDetails);

                const emailOtp = generateOTP();
                console.log("Generated OTP:", emailOtp);

                const token = await generateToken({
                    user: {
                        _id: userDetails._id,
                        userType: userDetails.references[0].referenceType,
                        email: userDetails.email,
                    },
                    isVerified: false,
                });
                await updateUserCoachAuthDetailsByIdService(userDetails._id, { emailOtp });
                console.log("User details updated with OTP:", userDetails._id);
                sendEmail(userDetails.email, "login otp", html(emailOtp));
                console.log("Email sent to:", userDetails.email);

                sendResponse(res, null, 200, true, "OTP sent successfully on email", { token });
                return;
            }
        } else {
            console.log("User does not exist. Creating a new user.");

            // Encrypt the password
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            let references = [];
            if (!userExists){
                userDetails = await createUserInfoServices(data_user);
            }else{
                console.log('fetching data from user')
                userDetails = await getUserInfoByMobileServices(data_user.mobile);
                console.log(userDetails)
            }
            console.log(userDetails._id);
            references.push({
                reference: userDetails._id, 
                referenceType: 'userinfo',
            });
            
            if (req.body.user_type == 'coach'){
                let coachExists = await coachExistsByMobileServices(data_coach.mobile);
                if (!coachExists){
                    userDetails = await createCoachInfoServices(data_coach);
                }else{
                    userDetails = await getCoachInfoByMobileServices(data_coach.mobile)
                }
                references.push({
                    reference: userDetails._id,
                    referenceType: 'coachinfo'
                });
            }
            console.log(references);
            const authDetails = await createUserCoachAuthService({
                email: req.body.email, 
                password: hashedPassword,
                references: references
            });

            const emailOtp = generateOTP();
            console.log("Generated OTP for new user:", emailOtp);

            await updateUserCoachAuthDetailsByIdService(userDetails._id, { emailOtp });

            sendEmail(authDetails.email, "login otp", html(emailOtp));
            console.log("Email sent to new user:", userDetails.email);

            const token = await generateToken({
                user: {
                    _id: userDetails._id,
                    userType: userDetails.userType,
                    email: userDetails.email,
                },
                isVerified: false,
            });
            console.log("Generated token for new user:", token);

            sendResponse(res, null, 201, true, "User created successfully. OTP sent on email for verification", { token });
            return;
        }
    } catch (err) {
        console.error("Error in createUserController:", err);
        sendResponse(res, err);
    }
};


const getUserDetailsController = async (req, res) => {
    try {
        const user = await getUserDetailsByIdService(req.user._id);
        if (!user) {
            sendResponse(res, null, 400, false, "user not found");
            return
        } else {
            sendResponse(res, null, 200, true, "user details fetched successfully", getUserDto(user));
            return
        }
    } catch (err) {
        sendResponse(res, err);
    }
}

// write a controller to verify Otp
const verifyOtpController = async (req, res) => {
    try {
        const userDetails = await getUserCoachAuthDetailsByIdService(req.user._id);
        if (!userDetails) {
            return sendResponse(res, null, 400, false, "user not found");
        } else {
            if (!userDetails.isVerified) {
                if (userDetails.emailOtp === req.body.emailOtp) {
                    const token = await generateToken({
                        user: {
                            _id: userDetails._id,
                            userType: userDetails.userType,
                            email: userDetails.email,
                        },
                        isVerified: true
                    });
                    await updateUserCoachAuthDetailsByIdService(userDetails._id, { isVerified: true });
                    return sendResponse(res, null, 200, true, "user verified successfully", { token });
                } else {
                    return sendResponse(res, null, 400, false, "invalid otp");
                }
            } else {
                if (req.user.tokenType == "forget") {
                    const token = await generateToken({
                        user: {
                            _id: userDetails._id,
                            userType: userDetails.userType,
                            email: userDetails.email,
                            tokenType: "forget"
                        },
                        isVerified: true
                    });
                    await updateUserCoachAuthDetailsByIdService(userDetails._id, { isVerified: true });
                    sendResponse(res, null, 200, true, "otp verified successfully", { token });
                    return
                } else {
                    sendResponse(res, null, 400, false, "user already verified");
                    return
                }
            }
        }
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
    }
}

const resendOtpToEmail = async (req, res) => {
    try {
        const user = await getUserCoachAuthDetailsByEmailService(req.body.email?.toLowerCase());
        if (!user) {
            sendResponse(res, null, 400, false, "User not found");
            return
        }
       
        const emailOtp = generateOTP();

        await updateUserDetailsByIdService(user._id, { emailOtp });
        sendEmail(user.email, "login otp", html(emailOtp));
        sendResponse(res, null, 200, true, "OTP sent successfully on email");
        return
    } catch (error) {
        console.log(error);
        logger.error(error);
        sendResponse(res, error);
    }

}


const forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch user by email
        const user = await getUserCoachAuthDetailsByEmailService(email);
        console.log(user);

        if (!user) {
            return sendResponse(res, null, 400, false, "Invalid credentials");
        }
        // Check if the user is verified
        if (!user.isVerified) {
            return sendResponse(res, null, 400, false, "User not verified");
        }

            
        const token = await generateToken(
            { user: { _id: user._id, email: user.email }, isVerified: user.isVerified },
            process.env.JWT_SECRET_KEY,
            "15m" // Token expires in 15 minutes
        );

        // Create a password reset link
        const resetLink = `devdoot/reset-password?token=${token}.com`;
        console.log(resetLink,'yeh lo');

        sendEmail(email, "Click on this link to reset the password ", forgothtml(resetLink));
        sendResponse(res, null, 200, true, "Reset Password Mail Sent Successfully");


    } catch (err) {
        console.log(err);
        logger.error(err);
        sendResponse(res, err);
    }
};



const changePasswordController = async (req, res) => {
    try {
        const { newPassword } = req.body; 
        const userId = req.user._id; 
        // Validate new password

        if (!newPassword || newPassword.length < 8) {
            return sendResponse(res, null, 400, false, "Password must be at least 8 characters long");
        }

        // Hash the new password
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

     
        const isUpdated = await updateUserCoachAuthDetailsByIdService(userId, { password: hashedPassword });

        if (!isUpdated) {
            return sendResponse(res, null, 500, false, "Password update failed");
        }

        // Respond with success
        return sendResponse(res, null, 200, true, "Your password has been changed successfully");
    } catch (err) {
        console.error(err);
        return sendResponse(res, err, 500, false, "An error occurred");
    }
};


module.exports = {
    createAccountController,
    getUserDetailsController,
    loginUserController,
    verifyOtpController,
    forgetPasswordController,
    resendOtpToEmail,
    changePasswordController
};

