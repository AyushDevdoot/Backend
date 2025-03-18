const createFirstAidTrainingDto = (data) => {
    const {
        name,
        currentLocation,
        trainingType,
        previousTraining,
        medicalCondition,
        certificateStatus,
        mobileNumber,
        trainingMode,
        medicalConditions,
        medicalConditionsDetails
    } = data;

    return {
        name,
        currentLocation,
        trainingType,
        previousTraining,
        medicalCondition,
        certificateStatus,
        mobileNumber,
        trainingMode,
        medicalConditions,
        medicalConditionsDetails
    };
};

function validateFirstAidTrainingFields(data) {
    const errors = {};

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // currentLocation validation
    if (!data.currentLocation || typeof data.currentLocation !== 'string' || data.currentLocation.trim().length < 2) {
        errors.currentLocation = "currentLocation must be at least 2 characters long and a valid string.";
    }

    // trainingType validation
    if (!data.trainingType || typeof data.trainingType !== 'string' || !data.trainingType.match(/(first-aid|first-aid-training|basic-first-aid|advanced-first-aid)/)) {
        errors.trainingType = "trainingType must be a valid string.";
    }

    // previousTraining validation
    if (!data.previousTraining || typeof data.previousTraining !== 'string') {
        errors.previousTraining = "previousTraining must be a valid string.";
    }

    // medicalCondition validation
    if (!data.medicalCondition || typeof data.medicalCondition !== 'string' || data.medicalCondition.trim().length < 2) {
        errors.medicalCondition = "medicalCondition must be at least 2 characters long and a valid string.";
    }

    // certificateStatus validation
    if (!data.certificateStatus || typeof data.certificateStatus !== 'string' || 
        !['Active', 'Expired', 'Renewal Required', 'Pending Certification', 'No Certification'].includes(data.certificateStatus)) {
        errors.certificateStatus = "Invalid certificate status";
    }

    // mobileNumber validation
    if (!data.mobileNumber || !data.mobileNumber.match(/^\+?\d{10,15}$/)) {
        errors.mobileNumber = "Please enter a valid mobile number";
    }

    // trainingMode validation
    if (!data.trainingMode || typeof data.trainingMode !== 'string' || 
        !['Virtual', 'Physical'].includes(data.trainingMode)) {
        errors.trainingMode = "Training mode must be either Virtual or Physical";
    }

    // medicalConditions validation
    if (!data.medicalConditions || typeof data.medicalConditions !== 'string' || 
        !['Yes', 'No', 'Not Aware'].includes(data.medicalConditions)) {
        errors.medicalConditions = "Medical conditions must be Yes, No, or Not Aware";
    }

    // medicalConditionsDetails validation
    if (data.medicalConditions === 'Yes' && (!data.medicalConditionsDetails || 
        typeof data.medicalConditionsDetails !== 'string')) {
        errors.medicalConditionsDetails = "Medical conditions details required when medical conditions is Yes";
    }

    return errors;
}

module.exports = {
    createFirstAidTrainingDto,
    validateFirstAidTrainingFields,
};