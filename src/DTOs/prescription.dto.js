const createPrescriptionDto = (data) => {
    const { name, mobile, email, address } = data;

    return {
        name,
        mobile,
        email,
        address,
    };
};

function validatePrescriptionFields(data) {
    const errors = {};

    // Name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long and a valid string.";
    }

    // Mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || !/^\d{10}$/.test(data.mobile)) {
        errors.mobile = "Mobile must be a valid 10-digit number.";
    }

    // Email validation
    if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Email must be a valid email address.";
    }

    // Address validation
    if (!data.address || typeof data.address !== 'string' || data.address.trim().length < 5) {
        errors.address = "Address must be at least 5 characters long and a valid string.";
    }

    return errors;
}

module.exports = {
    createPrescriptionDto,
    validatePrescriptionFields,
};
