const createCoachDto = (data) => {
    const {
        coachName,
        specialization,
        contactInfo,
        profilePhoto,
        experienceYear,
        bio,
        rating,
        pricePerMinute,
        languages,
        certification
    } = data;

    return {
        coachName,
        specialization,
        contactInfo,
        profilePhoto,
        experienceYear,
        bio,
        rating,
        pricePerMinute,
        languages,
        certification
    };
};

const validateSpecialization = (specialization) => {
    const validSpecializations = [
        "Addiction Recovery Coach",
        "Arthritis and Joint Health Coach",
        "Ayurveda Consultant",
        "Cardiovascular Health Coach",
        "Chronic Pain Management Coach",
        "Dermatologist Consultant",
        "Detox and Clean Eating Coach",
        "Diabetes Management Coach",
        "Health & Fitness Coach",
        "Holistic Wellness Coach",
        "Immunity Coach for Kids",
        "Lifestyle Transformation Coach",
        "Mental Health Support Coach",
        "Parenting Wellness Coach",
        "Post-Surgery Recovery Coach",
        "Relationship and Couples Coach",
        "Reproductive Health Coach",
        "Skin and Beauty Wellness Coach",
        "Sleep Wellness Coach",
        "Therapeutic Coach",
        "Weight Management Coach",
        "Women's Health Coach",
        "Work-Life Balance Coach",
        "Workplace Stress Coach"
    ];
    return validSpecializations.includes(specialization);
};

const updateCoachInfoDto = (data) => {
    const updateData = {};
    
    // Only allow updates to these specific fields
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.profilePhoto !== undefined) updateData.profilePhoto = data.profilePhoto;
    if (data.experienceYear !== undefined) updateData.experienceYear = data.experienceYear;
    if (data.specialization !== undefined) updateData.specialization = data.specialization;
    if (data.pricePerMinute !== undefined) updateData.pricePerMinute = data.pricePerMinute;
    if (data.languages !== undefined) updateData.languages = data.languages;
    if (data.sessionTime !== undefined) updateData.sessionTime = data.sessionTime;
    
    return updateData;
};

const validateCreateCoachDto = (data) => {
    const errors = {};

    if (!data.coachName || typeof data.coachName !== 'string' || data.coachName.trim().length < 2) {
        errors.coachName = "coachName must be a valid string and at least 2 characters long.";
    }

    if (!data.specialization || !validateSpecialization(data.specialization)) {
        errors.specialization = "Invalid specialization value";
    }

    if (!data.contactInfo || typeof data.contactInfo !== 'string' || data.contactInfo.trim().length < 2) {
        errors.contactInfo = "contactInfo must be a valid string and at least 2 characters long.";
    }

    if (!data.profilePhoto || typeof data.profilePhoto !== 'string' || data.profilePhoto.trim().length < 2) {
        errors.profilePhoto = "profilePhoto must be a valid string and at least 2 characters long.";
    }

    if (!data.experienceYear || typeof data.experienceYear !== 'number' || data.experienceYear <= 0) {
        errors.experienceYear = "experienceYear must be a positive number.";
    }

    if (!data.bio || typeof data.bio !== 'string' || data.bio.trim().length < 2) {
        errors.bio = "bio must be a valid string and at least 2 characters long.";
    }

    if (!data.pricePerMinute || typeof data.pricePerMinute !== 'number' || data.pricePerMinute <= 0) {
        errors.pricePerMinute = "pricePerMinute must be a positive number.";
    }

    if (!Array.isArray(data.languages) || data.languages.some(lang => typeof lang !== 'string' || lang.trim().length < 1)) {
        errors.languages = "languages must be an array of valid non-empty strings.";
    }

    return errors;
};

const validateUpdateCoachDto = (data) => {
    const errors = {};
    
    if (data.bio !== undefined && (typeof data.bio !== 'string' || data.bio.trim().length < 2)) {
        errors.bio = "bio must be a valid string and at least 2 characters long.";
    }

    if (data.profilePhoto !== undefined && (typeof data.profilePhoto !== 'string' || data.profilePhoto.trim().length < 2)) {
        errors.profilePhoto = "profilePhoto must be a valid string and at least 2 characters long.";
    }

    if (data.experienceYear !== undefined && (typeof data.experienceYear !== 'number' || data.experienceYear <= 0)) {
        errors.experienceYear = "experienceYear must be a positive number.";
    }

    if (data.specialization !== undefined && 
        !['health-fitness', 'chronic-diseases', 'sleep-wellness', 'holistic-wellness', 'stem-skills', 'parenting', 'worklife-balance', 'immunity-coach'].includes(data.specialization)) {
        errors.specialization = "specialization must be one of the following values: health-fitness, chronic-diseases, sleep-wellness, holistic-wellness, stem-skills, parenting, worklife-balance, immunity-coach";
    }

    if (data.pricePerMinute !== undefined && (typeof data.pricePerMinute !== 'number' || data.pricePerMinute <= 0)) {
        errors.pricePerMinute = "pricePerMinute must be a positive number.";
    }

    if (data.languages !== undefined && (!Array.isArray(data.languages) || data.languages.some(lang => typeof lang !== 'string' || lang.trim().length < 1))) {
        errors.languages = "languages must be an array of valid non-empty strings.";
    }

    if (data.sessionTime !== undefined && (typeof data.sessionTime !== 'number' || data.sessionTime <= 0)) {
        errors.sessionTime = "sessionTime must be a positive number.";
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

const getCoachDto = (data) => {
    const {
        _id,
        coachName,
        specialization,
        contactInfo,
        profilePhoto,
        experienceYear,
        bio,
        rating,
        isActive,
        pricePerMinute,
        languages,
        createdAt,
        updatedAt
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
        isActive,
        pricePerMinute,
        languages,
        createdAt,
        updatedAt
    };
};

module.exports = {
    createCoachDto,
    validateCreateCoachDto,
    getCoachesListDto,
    getCoachDto,
    updateCoachInfoDto,
    validateUpdateCoachDto
};
