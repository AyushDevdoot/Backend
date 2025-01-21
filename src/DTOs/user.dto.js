const createUserDto = (data) => {
    const { firstName, lastName, mobile, email, password } = data;
    return {
        firstName,
        lastName,
        mobile,
        email,
        password,
    }
}

const validateCreateUserDto = (data) => {
    const { firstName, lastName, mobile, email, password, whatsappNumber, userType } = data;

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone);

    if (![firstName, lastName, mobile, email, password].every(Boolean)) {
        console.log('Validation failed: Missing required fields');
        return false;
    }
    // if (!isValidEmail(email) || !isValidPhone(mobile) || (whatsappNumber && !isValidPhone(whatsappNumber))) {
    //     console.log('Validation failed: Invalid email or phone format');
    //     return false;
    // }
    //for now we are not validating mobile number 
    if (!isValidEmail(email)) {
        console.log('Validation failed: Invalid email or phone format');
        return false;
    }
    if (userType && !['care-giver', 'patient', 'admin'].includes(userType)) {
        console.log('Validation failed: Invalid user type');
        return false;
    }

    return true;
};


const getUserDto = (data) => {
    const { _id, firstName, lastName, phone, email, userType } = data;
    return {
        _id,
        firstName,
        lastName,
        phone,
        email,
        userType
    }
}

module.exports = {
    createUserDto,
    validateCreateUserDto,
    getUserDto
};