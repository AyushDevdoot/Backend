const createMedicalEquipmentDto = (data) => {
    const {
        patientName,
        currentLocation,
        equimentDetails,
        mobile,
        numberOfDays,
    } = data;

    return {
        patientName,
        currentLocation,
        equimentDetails,
        mobile,
        numberOfDays,
    };
};

function validateMedicalEquipmentFields(data) {
    const errors = {};

    // patientName validation
    if (!data.patientName || typeof data.patientName !== 'string' || data.patientName.trim().length < 2) {
        errors.patientName = "patientName must be at least 2 characters long and a valid string.";
    }

    // currentLocation validation
    if (!data.currentLocation || typeof data.currentLocation !== 'string' || data.currentLocation.trim().length < 2) {
        errors.currentLocation = "currentLocation must be at least 2 characters long and a valid string.";
    }

    // equimentDetails validation
    if (!data.equimentDetails || typeof data.equimentDetails !== 'string' || !data.equimentDetails.match(/(x-ray-machine|mri-machine|ct-scanner|ultrasound-machine|ecg-machine)/)) {
        errors.equimentDetails = "equimentDetails must be at least 2 characters long and a valid string.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || data.mobile.trim().length < 10) {
        errors.mobile = "mobile must be at least 10 characters long and a valid string.";
    }

    // numberOfDays validation
    if (!data.numberOfDays || typeof data.numberOfDays !== 'string') {
        errors.numberOfDays = "numberOfDays must be at least 2 characters long and a valid string.";
    }

    return errors;
}

module.exports = {
    createMedicalEquipmentDto,
    validateMedicalEquipmentFields,
};