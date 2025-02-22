const createCoachDto = (data) => {
    const { 
        firstName,
	lastName,
        specialization, 
        mobile, 
        profilePhoto, 
        experienceYear, 
        bio, 
        sessionTime, 
        pricePerSession, 
        languages, 
        countryCode, 
        certificate, 
        currency, 
        subscriptionStatus 
    } = data;

    return {
        firstName,
	lastName,
        specialization, // Array of ObjectIds referencing the specialization schema
        mobile,
        profilePhoto,
        experienceYear,
        bio,
        sessionTime: sessionTime || 30,  // Default to 60 minutes if not provided
        pricePerSession,
        languages: languages || [],  // Default to empty array if not provided
        countryCode,
        certificate: certificate || "",  // Default to empty string if not provided
        currency: currency || 'INR',  // Default to 'INR' if not provided
        subscriptionStatus: subscriptionStatus || 'inactive',  // Default to 'inactive' if not provided
    };
};

const validateCreateCoachDto = (data) => {
    const errors = {};

    // Validate coachName
    if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length < 2) {
        errors.firstName = "coachName must be a valid string and at least 2 characters long.";
    }

    if (data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length < 2) {
        errors.lastName = "coachName must be a valid string and at least 2 characters long.";
    }

    // Validate specialization (array of ObjectIds referencing the specialization model)
    if (!Array.isArray(data.specialization) || data.specialization.length === 0 || data.specialization.some(id => typeof id !== 'string' || id.trim().length < 2)) {
        errors.specialization = "specialization is needed !!";
    }

    // Validate mobile (phone number)
    const isValidPhone = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone);
    if (!data.mobile || !isValidPhone(data.mobile)) {
        errors.mobile = "mobile must be a valid phone number.";
    }

    // Validate profilePhoto URL
    if (!data.profilePhoto || typeof data.profilePhoto !== 'string' || data.profilePhoto.trim().length < 2) {
        errors.profilePhoto = "profilePhoto must be a valid URL string and at least 2 characters long.";
    }

    // Validate experienceYear
    if (!data.experienceYear || typeof data.experienceYear !== 'number' || data.experienceYear <= 0) {
        errors.experienceYear = "experienceYear must be a positive number greater than 0.";
    }

    // Validate bio
    if (!data.bio || typeof data.bio !== 'string' || data.bio.trim().length < 10) {
        errors.bio = "bio must be a valid string and at least 10 characters long.";
    }

    // Validate sessionTime (in minutes)
    if (data.sessionTime && (typeof data.sessionTime !== 'number' || data.sessionTime <= 0)) {
        errors.sessionTime = "sessionTime must be a positive number greater than 0.";
    }

    // Validate pricePerSession
    if (!data.pricePerSession || typeof data.pricePerSession !== 'number' || data.pricePerSession <= 0) {
        errors.pricePerSession = "pricePerSession must be a positive number greater than 0.";
    }

    // Validate languages (array of strings)
    if (!Array.isArray(data.languages) || data.languages.length === 0 || data.languages.some(lang => typeof lang !== 'string' || lang.trim().length < 1)) {
        errors.languages = "languages must be an array of valid non-empty strings.";
    }

    if (data.countryCode && (typeof data.countryCode !== 'string' || data.countryCode.trim().length < 1)) {
        errors.countryCode = "countryCode must be a valid string.";
    }

    if (data.certificate && (typeof data.certificate !== 'string' || data.certificate.trim().length < 2)) {
        errors.certificate = "certificate must be a valid string.";
    }

    // Validate subscriptionStatus
    if (data.subscriptionStatus && !['active', 'inactive', 'pending'].includes(data.subscriptionStatus)) {
        errors.subscriptionStatus = "subscriptionStatus must be one of the following: 'active', 'inactive', 'pending'.";
    }

    return errors;
};

const getCoachesListDto = (data) => {
    const {
        _id,
        coachName,
        specialization,
        contactInfo,
        profilePhoto,
        experienceYear,
        bio,
        rating,
        pricePerMinute,
        languages
    } = data;

    return {
        _id,
        coachName,
        specialization,
        contactInfo,
        profilePhoto,
        experienceYear,
        bio,
        rating,
        pricePerMinute,
        languages
    };
};

const getCoachProfileDto = (data) => {
    const { _id, 
	    firstName, 
	    lastName, 
	    specialization,
	    experienceYear,
	    pricePerSession,
	    sessionTime,
	    mobile, 
	    email, 
	    profilePhoto, 
	    bio, 
	    rating, 
	    languages, 
	    countryCode,
	    amountSpend,
	    currency,
	    subscriptionStatus,
	    isVerified 
    } = data;
    return {
	    _id,
	    firstName, 
	    lastName, 
	    specialization,
	    experienceYear,
	    pricePerSession,
	    sessionTime,
	    mobile, 
	    email, 
	    profilePhoto, 
	    bio, 
	    rating, 
	    languages, 
	    countryCode,
	    amountSpend,
	    currency,
	    subscriptionStatus,
	    isVerified 
    }
}

module.exports = {
    createCoachDto,
    validateCreateCoachDto,
    getCoachesListDto,
    getCoachProfileDto,
};
