const createUserDto = (data) => {
    const { 
        firstName,
        lastName,
        mobile, 
        profilePhoto, 
        bio, 
        languages, 
        countryCode, 
        currency, 
        address, 
        subscriptionStatus 
    } = data;

    return {
        firstName: firstName?.toLowerCase() || '',
        lastName : lastName?.toLowerCase() || '',
        mobile: mobile?.replaceAll('+',''),
        profilePhoto,
        bio,
        languages: languages?.map( language => language?.toLowerCase() || '' ),  // Default empty array if not provided
        countryCode: countryCode?.toUpperCase(),
        currency: currency || 'INR',  // Default INR if not provided
        address: address || "",  // Default empty string if not provided
        subscriptionStatus: subscriptionStatus || 'inactive',  // Default inactive if not provided
    };
}

const validateCreateUserDto = (data) => {
    const errors = {};

    const {
        firstName,
        lastName,
        mobile, 
        email, 
        profilePhoto, 
        bio, 
        languages, 
        countryCode, 
        currency, 
        address, 
        subscriptionStatus 
    } = data;

    // Helper functions for validations
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone);  // Mobile number regex

    // Checking if required fields are provided
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
        errors.firstName = "First name is required and must be at least 2 characters long.";
    }

    if (lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
        errors.lastName = "Last name is required and must be at least 2 characters long.";
    }

    if (!mobile || !isValidPhone(mobile)) {
        errors.mobile = "A valid mobile number is required.";
    }

    if (!profilePhoto || typeof profilePhoto !== 'string' || profilePhoto.trim().length < 2) {
        errors.profilePhoto = "Profile photo URL is required and must be a valid string.";
    }

    if (!languages || !Array.isArray(languages) || languages.some(lang => typeof lang !== 'string' || lang.trim().length < 1)) {
        errors.languages = "Languages must be an array of valid non-empty strings.";
    }

    if (!countryCode || typeof countryCode !== 'string' || countryCode.trim().length < 1) {
        errors.countryCode = "Country code is required and must be a valid string.";
    }

    // Validate optional fields
    if (bio && typeof bio !== 'string') {
        errors.bio = "Bio, if provided, must be a string.";
    }

    if (currency && !typeof currency === 'string') {
        errors.currency = "Currency must be a string.";
    }

    if (address && typeof address !== 'string') {
        errors.address = "Address, if provided, must be a string.";
    }

    if (subscriptionStatus && !['active', 'inactive', 'pending'].includes(subscriptionStatus)) {
        errors.subscriptionStatus = "Subscription status must be one of: 'active', 'inactive', or 'pending'.";
    }

    return errors;
};


const getUserProfileDto = (data) => {
    const { _id, 
        firstName, 
        lastName, 
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
    createUserDto,
    validateCreateUserDto,
    getUserProfileDto,
};
