const homeHealthDto = (data) => {
    const { packageName, packageItems, price } = data;
    return {
        packageName,
        packageItems,
        price,
    };
};


const validateHomeHealthPackageFields = (data) => {
    const errors = {};

    // packageName validation
    if (!data.packageName || typeof data.packageName !== 'string' || data.packageName.trim().length < 2) {
        errors.packageName = "packageName must be a valid string and at least 2 characters long.";
    }

    // packageItems validation
    if (!data.packageItems || !Array.isArray(data.packageItems) || data.packageItems.length === 0) {
        errors.packageItems = "packageItems must be a non-empty array of strings.";
    } else if (!data.packageItems.every(item => typeof item === 'string' && item.trim().length > 0)) {
        errors.packageItems = "Each item in packageItems must be a non-empty string.";
    }

    // pricePerYear validation
    if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
        errors.price = "price must be a positive number.";
    }

    return errors;
};


module.exports = {
    homeHealthDto,
    validateHomeHealthPackageFields,
};
