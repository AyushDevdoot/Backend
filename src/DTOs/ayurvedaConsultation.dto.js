const createAyurvedaConsultationFormDto = (data) => {
    const {
        consultationType,
        name,
        age,
        doshaType,
        healthConcern,
    } = data;

    return {
        consultationType,
        name,
        age,
        doshaType,
        healthConcern,
    };
};


function validateAyurvedaConsultationFormFields(data) {
    const errors = {};

    // consultationType validation
    if (!data.consultationType || typeof data.consultationType !== 'string' || !data.consultationType.match(/(ayurvedic|herbal|dosha)/)) {
        errors.consultationType = "consultationType must be a valid string.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // age validation
    if (!data.age || typeof data.age !== 'string' || data.age <= 0) {
        errors.age = "age must be a positive number.";
    }

    // doshaType validation
    if (!data.doshaType || typeof data.doshaType !== 'string' || !data.doshaType.match(/(vegetarian|non-vegetarian)/)) {
        errors.doshaType = "doshaType must be a valid string.";
    }

    // healthConcern validation
    if (!data.healthConcern || typeof data.healthConcern !== 'string' || data.healthConcern.trim().length < 2) {
        errors.healthConcern = "healthConcern must be at least 2 characters long and a valid string.";
    }

    return errors;
}


module.exports = {
    createAyurvedaConsultationFormDto,
    validateAyurvedaConsultationFormFields,
};