const createPetCareGiverFinderDto = (data) => {
    const {
        petRequired,
        serviceRequired,
        careLocation,
        careTime,
        name,
        email,
        mobile,
        specialNotes,
    } = data;

    return {
        petRequired,
        serviceRequired,
        careLocation,
        careTime,
        name,
        email,
        mobile,
        specialNotes,
    };
};


function validatePetCareGiverFinderFields(data) {
    const errors = {};

    // petRequired validation
    if (!data.petRequired || typeof data.petRequired !== 'object') {
        errors.petRequired = "petRequired must be a valid object.";
    } else {
        const { dogs, cats, others } = data.petRequired;
        if (dogs !== undefined && typeof dogs !== 'number') {
            errors.petRequiredDogs = "dogs must be a number value.";
        }
        if (cats !== undefined && typeof cats !== 'number') {
            errors.petRequiredCats = "cats must be a number value.";
        }
        if (others !== undefined && typeof others !== 'number') {
            errors.petRequiredOthers = "others must be a number value.";
        }
    }

    // serviceRequired validation
    if (!Array.isArray(data.serviceRequired) || data.serviceRequired.length === 0) {
        errors.serviceRequired = "serviceRequired must be a non-empty array.";
    } else {
        const validServices = ["sitting", "boarding", "walking", "grooming", "training"];
        const invalidServices = data.serviceRequired.filter((service) => !validServices.includes(service));
        if (invalidServices.length > 0) {
            errors.serviceRequired = `serviceRequired contains invalid values: ${invalidServices.join(", ")}.`;
        }
    }

    // careLocation validation
    if (!data.careLocation || typeof data.careLocation !== 'string' || data.careLocation.trim().length < 2) {
        errors.careLocation = "careLocation must be a valid string with at least 2 characters.";
    }

    // careTime validation
    if (!data.careTime || !["rightnow", "withinaweek", "in2months", "justbrowsing"].includes(data.careTime)) {
        errors.careTime = "careTime must be one of 'rightnow', 'withinaweek', 'in2months', or 'justbrowsing'.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be a valid string with at least 2 characters.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "email must be a valid email address.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || !/^\d+$/.test(data.mobile)) {
        errors.mobile = "mobile must be a valid string of digits.";
    }


    return errors;
}


module.exports = {
    createPetCareGiverFinderDto,
    validatePetCareGiverFinderFields,
};
