const createPetServiceDto = (data) => {
    const {
        serviceType,
        petType,
        petName,
        age,
        lastVaccinationDate,
        additionalInfo,
    } = data;

    return {
        serviceType,
        petType,
        petName,
        age,
        lastVaccinationDate,
        additionalInfo,
    };
};



function validatePetCareFields(data) {
    const errors = {};

    // serviceType validation
    if (!data.serviceType || typeof data.serviceType !== 'string' || !data.serviceType.match(/(veterinary|grooming|nutrition|behaviour|emergency|pet-boarding)/)) {
        errors.serviceType = "serviceType must be a valid string.";
    }

    // petType validation
    if (!data.petType || typeof data.petType !== 'string' || !data.petType.match(/(dog|cat|other)/)) {
        errors.petType = "petType must be a valid string.";
    }

    // petName validation
    if (!data.petName || typeof data.petName !== 'string' || data.petName.trim().length < 2) {
        errors.petName = "petName must be at least 2 characters long and a valid string.";
    }

    // age validation
    if (!data.age || typeof data.age !== 'string' || data.age <= 0) {
        errors.age = "age must be a valid string.";
    }

    // lastVaccinationDate validation
    if (!data.lastVaccinationDate || typeof data.lastVaccinationDate !== 'string' || data.lastVaccinationDate.trim().length < 2) {
        errors.lastVaccinationDate = "lastVaccinationDate must be at least 2 characters long and a valid string.";
    }



    return errors;
}


module.exports = {
    createPetServiceDto,
    validatePetCareFields,
};