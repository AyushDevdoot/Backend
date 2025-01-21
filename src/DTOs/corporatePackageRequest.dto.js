const createCorporatePackageRequestDto = (data) => {
    const {
        packageId,
        companyName,
        email,
        mobile,
        age,
        preferredStartDate,
        preferredStartTime,
        specialNotes,
        status,
        createdBy,
    } = data;

    return {
        packageId,
        companyName,
        email,
        mobile,
        age,
        preferredStartDate,
        preferredStartTime,
        specialNotes,
        status,
        createdBy,
    };
};


const validateCorporatePackageRequestFields = (data) => {
    const errors = {};

    // packageId validation
    if (!data.packageId || typeof data.packageId !== 'string' || data.packageId.trim().length === 0) {
        errors.packageId = "packageId must be a valid string and is required.";
    }

    // companyName validation
    if (!data.companyName || typeof data.companyName !== 'string' || data.companyName.trim().length < 2) {
        errors.companyName = "companyName must be at least 2 characters long and a valid string.";
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
        errors.email = "email must be a valid email address.";
    }

    // mobile validation
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!data.mobile || typeof data.mobile !== 'string' || !mobileRegex.test(data.mobile)) {
        errors.mobile = "mobile must be a valid number between 10 to 15 digits.";
    }

    // age validation
    const ageRegex = /^\d+$/;
    if (!data.age || typeof data.age !== 'string' || !ageRegex.test(data.age)) {
        errors.age = "age must be a numeric string.";
    }

    // preferredStartDate validation
    if (!data.preferredStartDate || typeof data.preferredStartDate !== 'string' || isNaN(new Date(data.preferredStartDate).getTime())) {
        errors.preferredStartDate = "preferredStartDate must be a valid date string.";
    }

    // preferredEndDate validation
    if (!data.preferredStartTime || typeof data.preferredStartTime !== 'string') {
        errors.preferredStartTime = "preferred Start Time must be a valid date string.";
    }


    return errors;
};


module.exports = {
    createCorporatePackageRequestDto,
    validateCorporatePackageRequestFields,
};
