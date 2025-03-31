const createCheckupPackageDto = (data) => {
    const { packageName, description, price, duration, validityPeriod, category } = data;
    return {
        packageName,
        description,
        price,
        duration,
        validityPeriod,
        category
    }
}

function validateHealthCheckupPackageFields(data) {
    const errors = {};

    // packageName validation
    if (!data.packageName || typeof data.packageName !== 'string' || data.packageName.trim().length < 2) {
        errors.packageName = "packageName must be at least 2 characters long and a valid string.";
    }

    // description validation
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 2) {
        errors.description = "description must be at least 2 characters long and a valid string.";
    }

    // price validation
    if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
        errors.price = "price must be a positive number.";
    }

    // duration validation
    if (!data.duration || typeof data.duration !== 'string' || data.duration.trim().length < 2) {
        errors.duration = "duration must be at least 2 characters long and a valid string.";
    }

    // validityPeriod validation
    if (!data.validityPeriod || typeof data.validityPeriod !== 'string' || data.validityPeriod.trim().length < 2) {
        errors.validityPeriod = "validityPeriod must be at least 2 characters long and a valid string.";
    }

    // category validation
    if (!data.category || typeof data.category !== 'string' || !data.category.match(/(basic|heart)/)) {
        errors.category = "category must be a valid string.";
    }

    return errors;
}

const updateHealthCheckupPackageDto = (data) => {
    const { packageName, description, price, duration, validityPeriod, category } = data;
    return {
        packageName,
        description,
        price,
        duration,
        validityPeriod,
        category
    }
}

module.exports = {
    createCheckupPackageDto,
    validateHealthCheckupPackageFields,
    updateHealthCheckupPackageDto
};