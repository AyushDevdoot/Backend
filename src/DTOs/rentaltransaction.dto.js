const createRentalTransactionDto = (data) => {
    const { customerId, equipmentId, rentalStartDate, rentalEndDate, rentalStatus, totalRentalPrice } = data;
    return {
        customerId,
        equipmentId,
        rentalStartDate,
        rentalEndDate,
        totalRentalPrice
    }
}

function validateRentalTransactionFields(data) {
    const errors = {};

    // customerId validation
    if (!data.customerId || typeof data.customerId !== 'string' || data.customerId.trim().length < 2) {
        errors.customerId = "customerId must be at least 2 characters long and a valid string.";
    }

    // equipmentId validation
    if (!data.equipmentId || typeof data.equipmentId !== 'string' || data.equipmentId.trim().length < 2) {
        errors.equipmentId = "equipmentId must be at least 2 characters long and a valid string.";
    }

    // rentalStartDate validation
    if (!data.rentalStartDate || typeof data.rentalStartDate !== 'string' || data.rentalStartDate.trim().length < 2) {
        errors.rentalStartDate = "rentalStartDate must be at least 2 characters long and a valid string.";
    }

    // rentalEndDate validation
    if (!data.rentalEndDate || typeof data.rentalEndDate !== 'string' || data.rentalEndDate.trim().length < 2) {
        errors.rentalEndDate = "rentalEndDate must be at least 2 characters long and a valid string.";
    }

    // totalRentalPrice validation
    if (data.totalRentalPrice == null || typeof data.totalRentalPrice !== 'number' || data.totalRentalPrice <= 0) {
        errors.totalRentalPrice = "totalRentalPrice must be a positive number.";
    }

    return errors;
}


module.exports = {
    createRentalTransactionDto,
    validateRentalTransactionFields
};