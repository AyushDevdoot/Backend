const createReproWellFormDto = (data) => {
    const { 
        doctorName,
        fullName,
        email,
        phoneNumber,
        age,
        gender,
        preferredDate,
        preferredTime,
        notes,
        location,
        createdBy
    } = data;
    
    return {
        doctorName,
        fullName,
        email,
        phoneNumber,
        age,
        gender,
        preferredDate,
        preferredTime,
        notes,
        location,
        createdBy
    }
}

const validateReproWellForm = (data) => {
    const errors = {};

    // Validate doctorName
    if (!data.doctorName) {
        errors.doctorName = 'Doctor name is required';
    }

    // Validate email
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }

    // Validate phoneNumber
    if (!data.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(data.phoneNumber)) {
        errors.phoneNumber = 'Phone number is invalid';
    }

    // Validate age
    if (!data.age) {
        errors.age = 'Age is required';
    } else if (data.age < 1) {
        errors.age = 'Age must be greater than 0';
    }

    // Validate gender
    if (!data.gender) {
        errors.gender = 'Gender is required';
    } else if (!['Male', 'Female', 'other'].includes(data.gender)) {
        errors.gender = 'Invalid gender value';
    }

    // Validate location
    if (!data.location) {
        errors.location = 'Location is required';
    }

    // Validate createdBy
    // if (!data.createdBy) {
    //     errors.createdBy = 'CreatedBy is required';
    // }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = { createReproWellFormDto, validateReproWellForm };