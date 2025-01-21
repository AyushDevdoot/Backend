const createFirstAidTrainingDto = (data) => {
    const {
        name,
        currentLocation,
        trainingType,
        previousTraining,
        mobile,
        medicalCondition,
    } = data;

    return {
        name,
        currentLocation,
        trainingType,
        previousTraining,
        mobile,
        medicalCondition,
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

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || data.mobile.trim().length < 2) {
        errors.mobile = "mobile must be at least 2 characters long and a valid string.";
    }

    // medicalCondition validation
    if (!data.medicalCondition || typeof data.medicalCondition !== 'string' || data.medicalCondition.trim().length < 2) {
        errors.medicalCondition = "medicalCondition must be at least 2 characters long and a valid string.";
    }

    return errors;
}

module.exports = {
    createFirstAidTrainingDto,
    validateFirstAidTrainingFields,
};