const createEmergencyContactDto = (data) => {
    const { contactName, relationship, phone, email, address, isPrimary, priorityLevel } = data;
    return {
        contactName,
        relationship,
        phone,
        email,
        address,
        isPrimary: isPrimary !== undefined ? isPrimary : true,
        priorityLevel: priorityLevel !== undefined ? priorityLevel : 0
    }
}

const validateEmergencyContact = (data) => {
    const errors = {};
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const { contactName, relationship, phone, email, address } = data;
    
    if (!contactName) errors.contactName = "Contact name is required";
    if (!relationship) errors.relationship = "Relationship is required";
    if (!phone) errors.phone = "Phone number is required";
    if (!email) errors.email = "Email is required";
    if (!address) errors.address = "Address is required";
    
    if (email && !isValidEmail(email)) {
        errors.email = "Invalid email format";
    }
    
    return errors;
};

const updateEmergencyContactDto = (data, existingContact) => {
    const { contactName, relationship, phone, email, address, isPrimary, priorityLevel } = data;
    
    return {
        contactName: contactName || existingContact.contactName,
        relationship: relationship || existingContact.relationship,
        phone: phone || existingContact.phone,
        email: email || existingContact.email,
        address: address || existingContact.address,
        isPrimary: isPrimary !== undefined ? isPrimary : existingContact.isPrimary,
        priorityLevel: priorityLevel !== undefined ? priorityLevel : existingContact.priorityLevel
    };
};

module.exports = {
    createEmergencyContactDto,
    validateEmergencyContact,
    updateEmergencyContactDto
};