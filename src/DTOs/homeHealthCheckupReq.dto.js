const createHomeHealthCheckupDto = (data) => {
    const {
        packageId,
        name,
        email,
        mobile,
        age,
        preferredStartDate,
        preferredStartTime,
        specialNotes,
    } = data;

    return {
        packageId,
        name,
        email,
        mobile,
        age,
        preferredStartDate,
        preferredStartTime,
        specialNotes,
    };
};


const validateHomeHealthCheckupFields = (data) => {
    const errors = {};

    // packageId validation
    if (!data.packageId || typeof data.packageId !== 'string') {
        errors.packageId = "packageId must be a valid string.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be a valid string and at least 2 characters long.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string' || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = "email must be a valid email address.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || !data.mobile.match(/^\d{10}$/)) {
        errors.mobile = "mobile must be a valid 10-digit number.";
    }

    // age validation
    if (!data.age || typeof data.age !== 'string' || isNaN(Number(data.age)) || Number(data.age) <= 0) {
        errors.age = "age must be a valid positive number.";
    }

    // preferredStartDate validation
    if (!data.preferredStartDate || typeof data.preferredStartDate !== 'string' || isNaN(Date.parse(data.preferredStartDate))) {
        errors.preferredStartDate = "preferredStartDate must be a valid date string.";
    }

    // preferredStartTime validation
    if (!data.preferredStartTime || typeof data.preferredStartTime !== 'string') {
        errors.preferredStartTime = "preferredStartTime must be a valid string.";
    }


    return errors;
};


module.exports = {
    createHomeHealthCheckupDto,
    validateHomeHealthCheckupFields,
};
