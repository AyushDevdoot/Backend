const createDietCounsellingDto = (data) => {
    const {
        planType,
        name,
        email,
        mobile,
        dob,
        category,
        dietician,
        dietaryPreference,
        healthGoal,
        allergies,
        preferredConsultationMode,
        specialistId
    } = data;

    return {
        planType,
        dietaryPreference,
        healthGoal,
        allergies,
        preferredConsultationMode,
        name,
        email,
        mobile,
        dob,
        dietician,
        category,
        specialistId
    };
};


function validateDietCounsellingFields(data) {
    const errors = {};

    // planType validation
    if (!data.planType || typeof data.planType !== 'string' || !data.planType.match(/(custom|expert)/)) {
        errors.planType = "planType must be a valid string.";
    }

    // category validation
    if (!data.category || typeof data.category !== 'string' || !data.category.match(/(weight-loss|muscle-gain|diabetic|lifestyle|keto|vegan|nutrition)/)) {
        errors.category = "category must be a valid string.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string' || data.email.trim().length < 2) {
        errors.email = "email must be at least 2 characters long and a valid string.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || data.mobile.trim().length < 2) {
        errors.mobile = "mobile must be at least 2 characters long and a valid string.";
    }

    // dietician validation
    if (!data.dietician || typeof data.dietician !== 'string' || !data.dietician.match(/(yes|no)/)) {
        errors.dietician = "dietician must be a valid string.";
    }
    // dob validation
    if (!data.dob || typeof data.dob !== 'string' || data.dob.trim().length < 2) {
        errors.dob = "dob must be at least 2 characters long and a valid string.";
    }

    // dietaryPreference validation
    if (!data.dietaryPreference || typeof data.dietaryPreference !== 'string' || !data.dietaryPreference.match(/(vegetarian|vegan|omnivore)/)) {
        errors.dietaryPreference = "dietaryPreference must be a valid string.";
    }

    // healthGoal validation
    if (!data.healthGoal || typeof data.healthGoal !== 'string' || !data.healthGoal.match(/(weight-loss|muscle-gain)/)) {
        errors.healthGoal = "healthGoal must be a valid string.";
    }

    // allergies validation
    if (!data.allergies || typeof data.allergies !== 'string' || !data.allergies.match(/(yes|no)/)) {
        errors.allergies = "allergies must be a valid string.";
    }
    // preferredConsultationMode validation
    if (!data.preferredConsultationMode || typeof data.preferredConsultationMode !== 'string' || !data.preferredConsultationMode.match(/(in-person|online)/)) {
        errors.preferredConsultationMode = "preferredConsultationMode must be a valid string.";
    }

    return errors;
}


module.exports = {
    createDietCounsellingDto,
    validateDietCounsellingFields,
};