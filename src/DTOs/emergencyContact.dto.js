const createEmergencyContactDto = (data) => {
    const { contactName, relationship, phone, email, address } = data;
    return {
        contactName,
        relationship,
        phone,
        email,
        address
    }
}
const validateEmergencyContact = (data) => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const { contactName, relationship, phone, email, address } = data;
    if (![contactName, relationship, phone, email, address].every(Boolean)) {
        console.log('Validation failed: Missing required fields');
        return false;
    }
    if (!isValidEmail(email)) {
        console.log('Validation failed: Invalid email or phone format');
        return false;
    }
    return true;
};

const updateEmergencyContactDto = (data) => {
    const { contactName, relationship, phone, email, address } = data;
    return {
        contactName,
        relationship,
        phone,
        email,
        address

    }
}
module.exports = {
    createEmergencyContactDto,
    validateEmergencyContact,
    updateEmergencyContactDto
};