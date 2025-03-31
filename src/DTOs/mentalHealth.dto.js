const createMentalHelathFormDto = (data) => {
    const {
        language,
        name,
        mobile,
        age,
        preferredLanguage,
        healthConcern,
    } = data;

    return {
        language,
        name,
        mobile,
        age,
        preferredLanguage,
        healthConcern,
    };
};


function validateMentalHealthFormFields(data) {
    const errors = {};

    // language validation
    if (!data.language || typeof data.language !== 'string' || !data.language.match(/(hindi|marathi|tamil|telugu|bengali|kannada)/)) {
        errors.language = "language must be a valid string.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || data.mobile.trim().length < 2) {
        errors.mobile = "mobile must be at least 2 characters long and a valid string.";
    }

    // age validation
    if (!data.age || typeof data.age !== 'string' || data.age <= 0) {
        errors.age = "age must be a valid string.";
    }

    // preferredLanguage validation
    if (!data.preferredLanguage || typeof data.preferredLanguage !== 'string' || !data.preferredLanguage.match(/(hindi|marathi|tamil|telugu|bengali|kannada)/)) {
        errors.preferredLanguage = "preferredLanguage must be a valid string.";
    }

    // healthConcern validation
    if (!data.healthConcern || typeof data.healthConcern !== 'string' || data.healthConcern.trim().length < 2) {
        errors.healthConcern = "healthConcern must be at least 2 characters long and a valid string.";
    }

    return errors;
}


module.exports = {
    createMentalHelathFormDto,
    validateMentalHealthFormFields,
};