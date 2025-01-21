const { createUserDto, validateCreateUserDto, getUserDto } = require("../DTOs/user.dto");
const { sendResponse, generateToken, generateOTP } = require("../Helpers/helpers.commonFunc");
const { saltRounds, html } = require("../Helpers/helpers.constant");
const logger = require("../Helpers/loggerFunction");
const { createUserService, getUserDetailsByIdService, getUserDetailsByEmailService, updateUserDetailsByIdService } = require("../Services/services.user");
const bcrypt = require("bcrypt");
const { createUserDictonaryServices } = require("../Services/services.userDictonary");
const { sendEmail } = require("../Helpers/helpersNotification");

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Fetch user by email
        const user = await getUserDetailsByEmailService(email.toLowerCase());
        if (!user) {
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
                userType: user.userType,
                email: user.email,
            },
            isVerified: true
        });
        // Send response with token and user info
        sendResponse(res, null, 200, true, "Login successful", { token: accessToken, user: getUserDto(user) });
    } catch (err) {
        sendResponse(res, err);
    }
};

const createUserController = async (req, res) => {
    try {
        if (!validateCreateUserDto(req.body)) {
            const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!isValidEmail(req.body.email.toLowerCase())) {
                sendResponse(res, null, 400, false, "Invalid email format");
                return;
            }
            sendResponse(res, null, 400, false, "Invalid request body");
            return;
        } else {
            let userDetails = await getUserDetailsByEmailService(req.body.email.toLowerCase());
            if (userDetails) {
                if (userDetails.isVerified) {
                    sendResponse(res, null, 400, false, "User already exists");
                    return;
                } else {
                    const emailOtp = generateOTP();
                    const token = await generateToken({
                        user: {
                            _id: userDetails._id,
                            userType: userDetails.userType,
                            email: userDetails.email,
                        },
                        isVerified: false
                    });
                    await updateUserDetailsByIdService(userDetails._id, { emailOtp });
                    sendEmail(userDetails.email, "login otp", html(emailOtp));
                    sendResponse(res, null, 200, true, "OTP sent successfully on email", { token });
                    return;
                }
            } else {
                let userType = "care-giver";
                if (req.body.registerType) {
                    userType = req.body.registerType;
                }
                // Encrypt the password using bcrypt
                const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

                const emailOtp = generateOTP();
                userDetails = await createUserService({
                    ...createUserDto({ ...req.body, email: req.body.email.toLowerCase(), password: hashedPassword }),
                    userType,
                    emailOtp
                });

                sendEmail(userDetails.email, "login otp", html(emailOtp));
                await createUserDictonaryServices({ userId: userDetails._id });

                const token = await generateToken({
                    user: {
                        _id: userDetails._id,
                        userType: userDetails.userType,
                        email: userDetails.email,
                    },
                    isVerified: false
                });

                sendResponse(res, null, 201, true, "User created successfully. OTP sent on email for verification", { token });
                return;
            }
        }
    } catch (err) {
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
        const userDetails = await getUserDetailsByIdService(req.user._id);
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
                    await updateUserDetailsByIdService(userDetails._id, { isVerified: true });
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
                    await updateUserDetailsByIdService(userDetails._id, { isVerified: true });
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

const sendOtpToEmail = async (req, res) => {
    try {
        const user = await getUserDetailsByEmailService(req.body.email?.toLowerCase());
        if (!user) {
            sendResponse(res, null, 400, false, "User not found");
            return
        }
        const token = await generateToken({
            user: {
                _id: user._id,
                userType: user.userType,
                email: user.email,
                tokenType: "forget"
            },
            isVerified: false
        });
        const emailOtp = generateOTP();
        await updateUserDetailsByIdService(user._id, { emailOtp });
        // sendEmail(user.email, "Forget Password otp", html(emailOtp));
        sendResponse(res, null, 200, true, "OTP sent successfully on email", { token });
        return
    } catch (error) {
        console.log(error);
        logger.error(error);
        sendResponse(res, error);
    }

}


const forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.user;
        // Fetch user by email
        const user = await getUserDetailsByEmailService(email);
        console.log(user);
        if (!user) {
            return sendResponse(res, null, 400, false, "Invalid credentials");
        }
        // Check if the user is verified
        if (!user.isVerified) {
            return sendResponse(res, null, 400, false, "User not verified");
        }
        if (req.user.tokenType == "forget") {
            if (req.body.newPass != "") {
                const isCurrPasswordValid = await bcrypt.compare(req.body.newPass, user.password);
                if (isCurrPasswordValid) {
                    return sendResponse(res, null, 400, false, "Previous password cannot be same as new password");
                }

                const hashedPassword = await bcrypt.hash(req.body.newPass, saltRounds);
                await updateUserDetailsByIdService(user._id, { password: hashedPassword });
                // Send response with token and user info
                sendResponse(res, null, 200, true, "Your Password has been changed Successfully");
            } else {
                sendResponse(res, null, 400, false, "Invalid request body");
            }
        } else {
            return sendResponse(res, null, 400, false, "Invalid Token");
        }


    } catch (err) {
        console.log(err);
        logger.error(err);
        sendResponse(res, err);
    }
};

const changePasswordController = async (req, res) => {
    try {
        const { email } = req.user;
        // Fetch user by email
        const user = await getUserDetailsByEmailService(email);
        console.log(user);
        if (!user) {
            return sendResponse(res, null, 400, false, "Invalid credentials");
        }
        // Check if the user is verified
        if (!user.isVerified) {
            return sendResponse(res, null, 400, false, "User not verified");
        }
        // Generate token if password is valid and user is verified
        if (req.body.currPass == req.body.newPass) {
            return sendResponse(res, null, 400, false, "New password cannot be same as current password");
        }
        else if (req.body.currPass != "" && req.body.newPass != "") {
            const isCurrPasswordValid = await bcrypt.compare(req.body.currPass, user.password);
            if (!isCurrPasswordValid) {
                return sendResponse(res, null, 400, false, "Current password is incorrect");
            }
            const accessToken = await generateToken({
                user: {
                    _id: user._id,
                    userType: user.userType,
                    email: user.email,
                },
                isVerified: false
            });
            const hashedPassword = await bcrypt.hash(req.body.newPass, saltRounds);
            await updateUserDetailsByIdService(user._id, { password: hashedPassword });
            // Send response with token and user info
            sendResponse(res, null, 200, true, "Your Password has been changed Successfully", { token: accessToken });
        } else {
            sendResponse(res, null, 400, false, "Invalid request body");
        }

    } catch (err) {
        console.log(err);
        logger.error(err);
        sendResponse(res, err);
    }
};
module.exports = {
    createUserController,
    getUserDetailsController,
    loginUserController,
    verifyOtpController,
    forgetPasswordController,
    sendOtpToEmail,
    changePasswordController
};