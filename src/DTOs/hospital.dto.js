const createHospitalDto = (data) => {
    const {
        hospitalName,
        contactNumber,
        streetAddress,
        area,
        district,
        city,
        state,
        country,
        pincode,
        position,
        hospitalType,
        category,
        doctors,
        specialitiesOffered,
        servicesOffered,
        packages,
        review,
        email,
        website,
        faq,
        opdTimings,
        ambulanceCount
    } = data;

    return {
        hospitalName,
        contactNumber,
        streetAddress,
        area,
        district,
        city,
        state,
        country,
        pincode,
        position,
        hospitalType,
        category,
        doctors,
        specialitiesOffered,
        servicesOffered,
        packages,
        review,
        email,
        website,
        faq,
        opdTimings,
        ambulanceCount
    };
};

function validateHospitalFields(data) {
    const errors = {};

    // hospitalName validation
    if (!data.hospitalName || typeof data.hospitalName !== 'string' || data.hospitalName.trim().length < 2) {
        errors.hospitalName = "hospitalName must be a string with at least 2 characters.";
    }

    // contactNumber validation
    if (!data.contactNumber || typeof data.contactNumber !== 'string') {
        errors.contactNumber = "contactNumber must be a valid string.";
    }

    // streetAddress validation
    if (!data.streetAddress || typeof data.streetAddress !== 'string' || data.streetAddress.trim().length < 5) {
        errors.streetAddress = "streetAddress must be a string with at least 5 characters.";
    }

    // area validation
    if (!data.area || typeof data.area !== 'string' || data.area.trim().length < 2) {
        errors.area = "area must be a string with at least 2 characters.";
    }

    // district validation
    if (!data.district || typeof data.district !== 'string' || data.district.trim().length < 2) {
        errors.district = "district must be a string with at least 2 characters.";
    }

    // city validation
    if (!data.city || typeof data.city !== 'string' || data.city.trim().length < 2) {
        errors.city = "city must be a string with at least 2 characters.";
    }

    // state validation
    if (!data.state || typeof data.state !== 'string' || data.state.trim().length < 2) {
        errors.state = "state must be a string with at least 2 characters.";
    }

    // country validation
    if (!data.country || typeof data.country !== 'string' || data.country.trim().length < 2) {
        errors.country = "country must be a string with at least 2 characters.";
    }

    // pincode validation
    if (!data.pincode || typeof data.pincode !== 'string') {
        errors.pincode = "pincode must be a valid string.";
    }

    // position validation
    if (data.position && (typeof data.position !== 'string' || data.position.trim().length < 2)) {
        errors.position = "position must be a string with at least 2 characters if provided.";
    }

    // hospitalType validation
    if (!data.hospitalType || !['private', 'government'].includes(data.hospitalType)) {
        errors.hospitalType = "hospitalType must be either 'private' or 'government'.";
    }

    // category validation
    if (!data.category || !['critical-care', 'surgery', 'maternity', 'speciality', 'mental-health', 'burn', 'veterinary', 'geriatric-care'].includes(data.category)) {
        errors.category = "category must be one of the specified categories.";
    }

    // doctors validation
    if (data.doctors && !Array.isArray(data.doctors)) {
        errors.doctors = "doctors must be an array.";
    }

    // specialitiesOffered validation
    if (!data.specialitiesOffered || !Array.isArray(data.specialitiesOffered)) {
        errors.specialitiesOffered = "specialitiesOffered must be an array of strings.";
    }

    // servicesOffered validation
    if (!data.servicesOffered || !Array.isArray(data.servicesOffered)) {
        errors.servicesOffered = "servicesOffered must be an array of strings.";
    }

    // packages validation
    if (data.packages && !Array.isArray(data.packages)) {
        errors.packages = "packages must be an array of strings if provided.";
    }

    // review validation
    if (data.review !== undefined && (typeof data.review !== 'number' || data.review < 0)) {
        errors.review = "review must be a non-negative number if provided.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string') {
        errors.email = "email must be a valid string.";
    }

    // website validation
    if (!data.website || typeof data.website !== 'string') {
        errors.website = "website must be a valid string.";
    }

    // faq validation
    if (data.faq && !Array.isArray(data.faq)) {
        errors.faq = "faq must be an array of strings if provided.";
    }

    // opdTimings validation
    if (!data.opdTimings || typeof data.opdTimings !== 'string') {
        errors.opdTimings = "opdTimings must be a valid string.";
    }

    // ambulanceCount validation
    if (typeof data.ambulanceCount !== 'number' || data.ambulanceCount < 0) {
        errors.ambulanceCount = "ambulanceCount must be a non-negative number.";
    }

    return errors;
}

const updateHospitalDto = (data) => {
    const {
        hospitalName,
        contactNumber,
        streetAddress,
        area,
        district,
        city,
        state,
        country,
        pincode,
        position,
        hospitalType,
        category,
        doctors,
        specialitiesOffered,
        servicesOffered,
        packages,
        review,
        email,
        website,
        faq,
        opdTimings,
        ambulanceCount
    } = data;

    return {
        hospitalName,
        contactNumber,
        streetAddress,
        area,
        district,
        city,
        state,
        country,
        pincode,
        position,
        hospitalType,
        category,
        doctors,
        specialitiesOffered,
        servicesOffered,
        packages,
        review,
        email,
        website,
        faq,
        opdTimings,
        ambulanceCount
    };
};

module.exports = {
    createHospitalDto,
    validateHospitalFields,
    updateHospitalDto
};
