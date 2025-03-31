const createCorporateHealthDto = (data) => {
    const { companyName, packageType, totalEmployees, preferredStartDate, preferredEndDate, packageDuration, price, status, services } = data;
    return {
        companyName,
        packageType,
        totalEmployees,
        preferredStartDate,
        preferredEndDate,
        packageDuration,
        price,
        status,
        services
    }
}
function validateCorporateHealthFields(data) {
    const errors = {};

    // companyName validation
    if (!data.companyName || typeof data.companyName !== 'string' || data.companyName.trim().length < 2) {
        errors.companyName = "companyName must be at least 2 characters long and a valid string.";
    }

    // packageType validation
    if (!data.packageType || typeof data.packageType !== 'string' || !data.packageType.match(/(wellness|fitness)/)) {
        errors.packageType = "packageType must be a valid string.";
    }

    // totalEmployees validation
    if (!data.totalEmployees || typeof data.totalEmployees !== 'number' || data.totalEmployees <= 0) {
        errors.totalEmployees = "totalEmployees must be a positive number.";
    }

    // preferredStartDate validation
    if (!data.preferredStartDate || typeof data.preferredStartDate !== 'string' || data.preferredStartDate.trim().length < 2) {
        errors.preferredStartDate = "preferredStartDate must be at least 2 characters long and a valid string.";
    }

    // preferredEndDate validation
    if (!data.preferredEndDate || typeof data.preferredEndDate !== 'string' || data.preferredEndDate.trim().length < 2) {
        errors.preferredEndDate = "preferredEndDate must be at least 2 characters long and a valid string.";
    }

    // packageDuration validation
    if (!data.packageDuration || typeof data.packageDuration !== 'string' || data.packageDuration.trim().length < 2) {
        errors.packageDuration = "packageDuration must be at least 2 characters long and a valid string.";
    }

    // price validation
    if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
        errors.price = "price must be a positive number.";
    }

    // status validation
    if (!data.status || typeof data.status !== 'string' || !data.status.match(/(active|completed)/)) {
        errors.status = "status must be a valid string.";
    }

    // services validation
    if (!data.services || typeof data.services !== 'object') {
        errors.services = "services must be a valid string.";
    }

    return errors;
}

const updateCorporateHealthDto = (data) => {
    const { companyName, packageType, totalEmployees, preferredStartDate, preferredEndDate, packageDuration, price, status, services } = data;
    return {
        companyName,
        packageType,
        totalEmployees,
        preferredStartDate,
        preferredEndDate,
        packageDuration,
        price,
        status,
        services
    }
}

module.exports = {
    createCorporateHealthDto,
    validateCorporateHealthFields,
    updateCorporateHealthDto
};