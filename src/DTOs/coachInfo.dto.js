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
        languages
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
        languages
    };
};

const validateCreateCoachDto = (data) => {
    const errors = {};

    if (!data.coachName || typeof data.coachName !== 'string' || data.coachName.trim().length < 2) {
        errors.coachName = "coachName must be a valid string and at least 2 characters long.";
    }

    if (!['health-fitness', 'chronic-diseases', 'sleep-wellness', 'holistic-wellness', 'stem-skills', 'parenting', 'worklife-balance', 'immunity-coach'].includes(data.specialization)) {
        errors.specialization = "specialization must be one of the following values: health-fitness, chronic-diseases, sleep-wellness, holistic-wellness, stem-skills, parenting, worklife-balance, immunity-coach";
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
    getCoachDto
};
