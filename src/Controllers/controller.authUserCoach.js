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
const { createUserCoachAuthService, getAuthDetailsByEmailService, getAuthDetailsByIdService,getUserCoachAuthDetailsByEmailService, updateAuthDetailsByIdService } = require('../Services/services.authUserCoach');
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
        if (!user.isVerified) {
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

const createUserAccountController = async (req, res) => {
    try {
        let data_user = {};
        let errors = {};

        // Validate user_type (only allow 'user' type here)
        if (!req.body.user_type || req.body.user_type !== 'user') {
            return sendResponse(res, null, 422, false, 'Error: Invalid user type!');
        }

        // Validate the authentication data (email, password)
        errors = validateAuthDto(req.body);
        if (Object.keys(errors).length > 0) {
            return sendResponse(res, null, 422, false, errors);
        }

        // Create the user DTO (data transfer object) and validate user-specific data
        data_user = createUserDto(req.body);
        errors = validateCreateUserDto(data_user);
        if (Object.keys(errors).length > 0) {
            return sendResponse(res, null, 422, false, errors);
        }

        let userExistsByMobile = await userExistsByMobileServices(data_user.mobile);

        // Check if a user with the same email exists in the auth model
        let accountDetails = await getAuthDetailsByEmailService(req.body.email);

        if (accountDetails) {
            // Check if the user exists as a 'coach' or 'user'
            const existingUserType = accountDetails.references[0].referenceType;

            if (existingUserType === 'userinfo' && req.body.user_type !== 'user') {
                // User exists as a 'user', cannot create as a 'coach'
                return sendResponse(res, null, 400, false, 'Account already exists as a user. Cannot switch to coach.');
            }

            if (existingUserType === 'coachinfo' && req.body.user_type !== 'coach') {
                // User exists as a 'coach', cannot create as a 'user'
                return sendResponse(res, null, 400, false, 'Account already exists as a coach. Cannot switch to user.');
            }

            // If user is verified but mobile already exists, we return an error
            if (accountDetails.isVerified && userExistsByMobile) {
                return sendResponse(res, null, 400, false, "User already exists with the same mobile number.");
            }

            // If user is not verified, send OTP for email verification
            if (!accountDetails.isVerified) {
                const emailOtp = generateOTP();
                const token = await generateToken({
                    user: {
                        _id: accountDetails._id,
                        userType: existingUserType,
                        email: accountDetails.email,
                    },
                    isVerified: false,
                });

                await updateAuthDetailsByIdService(accountDetails._id, { emailOtp });
                sendEmail(accountDetails.email, "login otp", html(emailOtp));

                return sendResponse(res, null, 200, true, "OTP sent successfully on email for verification", { token });
            }

            return;
        } else {
            // If the user does not exist in the auth model, create a new user
            if (userExistsByMobile) {
                return sendResponse(res, null, 422, false, 'User is already registered with this mobile number.');
            }

            // Encrypt the password and create a new user account
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            // Create new user info entry
            const newUserInfo = await createUserInfoServices(data_user);

            // Create the authentication details for the user
            const accountDetails = await createUserCoachAuthService({
                email: req.body.email,
                password: hashedPassword,
                references: [{ reference: newUserInfo._id, referenceType: 'userinfo' }]
            });

            // Generate OTP and send it to the email for verification
            const emailOtp = generateOTP();
            await updateAuthDetailsByIdService(accountDetails._id, { emailOtp });
            sendEmail(accountDetails.email, "login otp", html(emailOtp));

            const token = await generateToken({
                user: {
                    _id: accountDetails._id,
                    userType: 'user', // Setting 'user' as the default type
                    email: accountDetails.email,
                },
                isVerified: false,
            });

            let response_data = { 'token': token, 'data': newUserInfo };
            response_data.userId = getUserProfileDto(newUserInfo._id)._id;

            return sendResponse(res, null, 201, true, "User created successfully. OTP sent on email for verification", response_data);
        }
    } catch (err) {
        console.error("Error in createUserAccountController:", err);
        return sendResponse(res, err);
    }
};

// coach - account creation

const createCoachAccountController = async (req, res) => {
    try {
        let data_coach = {};
        let errors = {};

        // Validate user_type (only allow 'coach' type here)
        if (!req.body.user_type || req.body.user_type !== 'coach') {
            return sendResponse(res, null, 422, false, 'Error: Invalid user type!');
        }

        // Validate the authentication data (email, password)
        errors = validateAuthDto(req.body);
        if (Object.keys(errors).length > 0) {
            return sendResponse(res, null, 422, false, errors);
        }

        // Create the coach DTO (data transfer object) and validate coach-specific data
        data_coach = createCoachDto(req.body);
        errors = validateCreateCoachDto(data_coach);
        if (Object.keys(errors).length > 0) {
            return sendResponse(res, null, 422, false, errors);
        }

        let coachExists = await coachExistsByMobileServices(data_coach.mobile);

        // Check if a coach with the same email exists in the auth model
        let accountDetails = await getAuthDetailsByEmailService(req.body.email);

        if (accountDetails) {
            // Check for existing user type (user or coach)
            const existingAccountType = accountDetails.references[0].referenceType;

            // If it's already a user account, prevent creating a coach with the same email
            if (existingAccountType === 'userinfo' && req.body.user_type === 'coach') {
                return sendResponse(res, null, 400, false, 'Mobile is already associated with a user account. Cannot create a coach account.');
            }

            // If it's already a coach account, prevent creating another coach with the same email
            if (existingAccountType === 'coachinfo' && req.body.user_type === 'coach') {
                if (coachExists) {
                    return sendResponse(res, null, 400, false, 'Coach already exists with this email.');
                }
                return;
            }

            // If the account exists and is not verified, send OTP
            if (!accountDetails.isVerified) {
                const emailOtp = generateOTP();
                const token = await generateToken({
                    user: {
                        _id: accountDetails._id,
                        userType: accountDetails.references[0].referenceType,
                        email: accountDetails.email,
                    },
                    isVerified: false,
                });

                await updateAuthDetailsByIdService(accountDetails._id, { emailOtp });
                sendEmail(accountDetails.email, "login otp", html(emailOtp));

                return sendResponse(res, null, 200, true, "OTP sent successfully on email", { token });
            }

            return;
        } else {
            // If coach doesn't exist yet, proceed with registration
            if (coachExists) {
                return sendResponse(res, null, 422, false, 'Coach is already registered with this mobile number.');
            }

            // Encrypt the password and create a new coach account
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            // Create the coach info and link it to the user's references
            let coachInfo = await createCoachInfoServices(data_coach);
            let references = [{
                reference: coachInfo._id,
                referenceType: 'coachinfo'
            }];

            // Create the auth details for the coach
            const authDetails = await createUserCoachAuthService({
                email: req.body.email,
                password: hashedPassword,
                references: references
            });

            // Generate OTP and send it to the email for verification
            const emailOtp = generateOTP();
            await updateAuthDetailsByIdService(authDetails._id, { emailOtp });
            sendEmail(authDetails.email, "login otp", html(emailOtp));

            const token = await generateToken({
                user: {
                    _id: authDetails._id,
                    userType: 'coach',
                    email: authDetails.email,
                },
                isVerified: false,
            });

            let response_data = { 'token': token, 'data': coachInfo };
            response_data.coachId = getCoachProfileDto(coachInfo._id)._id;

            return sendResponse(res, null, 201, true, "Coach account created successfully. OTP sent on email for verification", response_data);
        }
    } catch (err) {
        console.error("Error in createCoachAccountController:", err);
        return sendResponse(res, err);
    }
};

const createAccountController = async (req, res) => {
    try {
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
        if (userDetails) {
            if (userDetails.isVerified) {

                if (req.body.user_type == 'user'){
                    let userExists = await userExistsByMobileServices(data_user.mobile);
                    if (userExists){
                        sendResponse(res, null, 400, false, "User already exists");
                        return
                    }
                }else{
                    let coachExists = await coachExistsByMobileServices(data_user.mobile);
                    if (coachExists){
                        sendResponse(res, null, 400, false, "User already exists");
                        return
                    }
                }

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
                await updateAuthDetailsByIdService(userDetails._id, { emailOtp });
                console.log("User details updated with OTP:", userDetails._id);
                sendEmail(userDetails.email, "login otp", html(emailOtp));
                console.log("Email sent to:", userDetails.email);

                sendResponse(res, null, 200, true, "OTP sent successfully on email", { token });
                return;
            }
        } else {
            if (req.body.user_type == 'user'){
                let userExists = await userExistsByMobileServices(data_user.mobile);
                if (userExists){
                    sendResponse(res, null, 422, false, 'User is registered with Mobile number');
                    return
                }
            }else{
                let coachExists = await coachExistsByMobileServices(data_user.mobile);
                if (coachExists){
                    sendResponse(res, null, 422, false, 'coach is registered with Mobile number');
                    return
                }
            }
            console.log("User does not exist. Creating a new user.");

            // Encrypt the password
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            let references = [];
            userDetails = await createUserInfoServices(data_user);
            console.log(userDetails);
            references.push({
                reference: userDetails._id, 
                referenceType: 'userinfo',
            });
            if (req.body.user_type == 'coach'){
                userDetails = await createCoachInfoServices(data_coach);
                references.push({
                    reference: userDetails._id,
                    referenceType: 'coachinfo'
                });
            }
            const authDetails = await createUserCoachAuthService({
                email: req.body.email, 
                password: hashedPassword,
                references: references
            });

            const emailOtp = generateOTP();
            console.log("Generated OTP for new user:", emailOtp);

            await updateAuthDetailsByIdService(userDetails._id, { emailOtp });

            sendEmail(authDetails.email, "login otp", html(emailOtp));

            const token = await generateToken({
                user: {
                    _id: authDetails._id,
                    userType: userDetails.userType,
                    email: authDetails.email,
                },
                isVerified: false,
            });
            let response_data = {'token': token};
            for (let ref of authDetails.references){
                if (ref.referenceType === 'coachinfo'){
                    response_data[ref.referenceType] = getCoachProfileDto(ref.reference);
                }else{
                    response_data[ref.referenceType] = getUserProfileDto(ref.reference);
                }
            }
            sendResponse(res, null, 201, true, "User created successfully. OTP sent on email for verification", response_data);
            return;
        }
    } catch (err) {
        console.error("Error in createUserController:", err);
        sendResponse(res, err);
    }
};


const getUserDetailsController = async (req, res) => {
    try {
        const user = await getAuthDetailsByIdService(req.user._id);
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
        const userDetails = await getAuthDetailsByIdService(req.user._id);
        const response_data = {}
        if (!userDetails) {
            return sendResponse(res, null, 400, false, "user not found");
        } else {
            if (!userDetails.isVerified) {
                if (userDetails.emailOtp === req.body.emailOtp) {
                    const token = await generateToken({
                        user: {
                            _id: userDetails._id,
                            userType: req.userType,
                            email: userDetails.email,
                        },
                        isVerified: true
                    });
                    response_data['token'] = token;

                    for (let ref of userDetails.references){
                        if (ref.referenceType.includes(req.user)){
                            response_data[req.user+'Id'] = getCoachProfileDto(ref.reference);
                            break;
                        }
                    }
                    await updateAuthDetailsByIdService(userDetails._id, { isVerified: true });
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
                    await updateAuthDetailsByIdService(userDetails._id, { isVerified: true });
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

        await updateAuthDetailsByIdService(user._id, { emailOtp });
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

     
        const isUpdated = await updateAuthDetailsByIdService(userId, { password: hashedPassword });

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
    createCoachAccountController,
    createUserAccountController,
    getUserDetailsController,
    loginUserController,
    verifyOtpController,
    forgetPasswordController,
    resendOtpToEmail,
    changePasswordController
};

