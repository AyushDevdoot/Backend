// DTO function
function createEquipmentDto(data) {
    const { equipmentName, category, description, rentalPricePerDay, manufacturer, serialNumber, availabilityStatus } = data;
    return {
        equipmentName,
        category,
        description,
        rentalPricePerDay,
        manufacturer,
        serialNumber,
        availabilityStatus
    };
}

// Validation function
function validateEquipmentFields(data) {
    const errors = {};

    // equipmentName validation
    if (!data.equipmentName || typeof data.equipmentName !== 'string' || data.equipmentName.trim().length < 2) {
        errors.equipmentName = "Equipment name must be at least 2 characters long and a valid string.";
    }

    // category validation
    if (!data.category || typeof data.category !== 'string' || data.category.trim().length < 3) {
        errors.category = "Category must be at least 3 characters long and a valid string.";
    }

    // description validation
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters long and a valid string.";
    }

    // rentalPricePerDay validation
    if (data.rentalPricePerDay == null || typeof data.rentalPricePerDay !== 'number' || data.rentalPricePerDay <= 0) {
        errors.rentalPricePerDay = "Rental price per day must be a positive number.";
    }

    // manufacturer validation
    if (!data.manufacturer || typeof data.manufacturer !== 'string' || data.manufacturer.trim().length < 3) {
        errors.manufacturer = "Manufacturer must be at least 3 characters long and a valid string.";
    }

    // serialNumber validation
    if (!data.serialNumber || typeof data.serialNumber !== 'string' || data.serialNumber.trim().length < 5) {
        errors.serialNumber = "Serial number must be at least 5 characters long and a valid string.";
    }

    return errors;
}

const updateEquipmentDto = (data) => {
    const { equipmentId, equipmentName, category, description, rentalPricePerDay, manufacturer, serialNumber, availabilityStatus } = data;
    return {
        equipmentId,
        equipmentName,
        category,
        description,
        rentalPricePerDay,
        manufacturer,
        serialNumber,
        availabilityStatus
    };
}
module.exports = {
    createEquipmentDto,
    validateEquipmentFields,
    updateEquipmentDto
};
