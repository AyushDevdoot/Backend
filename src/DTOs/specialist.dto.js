const createSpecialistDto = (data) => {
    const { specialistServiceCategory, specialistServiceType, name, location, profileDescription, servicesOffered, rate, yearsOfExperience, isActive, createdBy } = data;
    return {
        specialistServiceCategory,
        specialistServiceType,
        name,
        location,
        profileDescription,
        servicesOffered,
        rate,
        yearsOfExperience,
    }
}

const validateSpecialistFields = (data) => {
    const errors = {};

    // specialistServiceCategory validation
    if (!data.specialistServiceCategory || typeof data.specialistServiceCategory !== 'string' || !data.specialistServiceCategory.match(/(nutrition|mental-health|diet-counselling|child-sponsorship|emergency-contact|hospital|corporate-health|girl-safety|health-checkup-package|user-dictonary|pet-care-form|ayurveda-consultation-form|first-aid-training|mental-health)/)) {
        errors.specialistServiceCategory = "specialistServiceCategory must be a valid string.";
    }

    // specialistServiceType validation
    if (!data.specialistServiceType || typeof data.specialistServiceType !== 'string' || !data.specialistServiceType.match(/(consultation|training|counselling|referral|other)/)) {
        errors.specialistServiceType = "specialistServiceType must be a valid string.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // location validation
    if (!data.location || typeof data.location !== 'string' || data.location.trim().length < 2) {
        errors.location = "location must be at least 2 characters long and a valid string.";
    }

    // profileDescription validation
    if (!data.profileDescription || typeof data.profileDescription !== 'string' || data.profileDescription.trim().length < 2) {
        errors.profileDescription = "profileDescription must be at least 2 characters long and a valid string.";
    }

    // servicesOffered validation
    if (!data.servicesOffered || typeof data.servicesOffered !== 'object') {
        errors.servicesOffered = "servicesOffered must be a array.";
    }

    // rate validation
    if (!data.rate || typeof data.rate !== 'number' || data.rate <= 0) {
        errors.rate = "rate must be a positive number.";
    }

    // yearsOfExperience validation
    if (!data.yearsOfExperience || typeof data.yearsOfExperience !== 'number') {
        errors.yearsOfExperience = "yearsOfExperience  must be a positive number.";
    }



    return errors;
}

module.exports = {
    createSpecialistDto,
    validateSpecialistFields
};