const createCustomerDto = (data) => {
    const { customerName, contactNumber, email, address } = data;
    return {
        customerName,
        contactNumber,
        email,
        address,
    }
}

function validateCustomerFields(data) {
    const errors = {};

    // customerName validation
    if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim().length < 2) {
        errors.customerName = "customer name must be at least 2 characters long and a valid string.";
    }

    // contactNumber validation
    if (!data.contactNumber || typeof data.contactNumber !== 'string') {
        errors.contactNumber = "contactNumber must be a valid string.";
    }

    // address validation
    if (!data.address || typeof data.address !== 'string' || data.address.trim().length < 5) {
        errors.address = "address must be at least 5 characters long and a valid string.";
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email';
    }
    return errors;
}


module.exports = {
    createCustomerDto,
    validateCustomerFields
};