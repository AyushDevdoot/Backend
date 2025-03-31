const createImmunicareDto = (data) => {
    const {
        name,
        mobile,
        age,
        vaccineType,
        preferredDate,
        additionalInfo,
        insuranceProvider,
        policyNumber,
    } = data;

    return {
        name,
        mobile,
        age,
        vaccineType,
        preferredDate,
        additionalInfo,
        insuranceProvider,
        policyNumber,
    };
};


function validateImmunicareFields(data) {
    const errors = {};

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || data.mobile.trim().length < 10) {
        errors.mobile = "mobile must be at least 10 characters long and a valid string.";
    }

    // age validation
    if (!data.age || typeof data.age !== 'string') {
        errors.age = "age must be a valid string.";
    }

    // vaccineType validation
    if (!data.vaccineType || typeof data.vaccineType !== 'string' || !data.vaccineType.match(/(vaccine|injection|tablet|capsule|other)/)) {
        errors.vaccineType = "vaccineType must be a valid string.";
    }

    // preferredDate validation
    if (!data.preferredDate || typeof data.preferredDate !== 'string' || data.preferredDate.trim().length < 2) {
        errors.preferredDate = "preferredDate must be at least 2 characters long and a valid string.";
    }

    // insuranceProvider validation
    if (!data.insuranceProvider || typeof data.insuranceProvider !== 'string' || data.insuranceProvider.trim().length < 2) {
        errors.insuranceProvider = "insuranceProvider must be at least 2 characters long and a valid string.";
    }

    // policyNumber validation
    if (!data.policyNumber || typeof data.policyNumber !== 'string' || data.policyNumber.trim().length < 2) {
        errors.policyNumber = "policyNumber must be at least 2 characters long and a valid string.";
    }



    return errors;
}


module.exports = {
    createImmunicareDto,
    validateImmunicareFields,
};