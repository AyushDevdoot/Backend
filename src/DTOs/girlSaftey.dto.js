
const createGirlSafetyDto = (data) => {
    const {
        participantName,
        participantEmail,
        participantPhone,
        age,
        preferredStartDate,
        guardianPhone,
        guardianEmail,
        programModule,
        category,
        specialNotes,
    } = data;

    return {
        participantName,
        participantEmail,
        participantPhone,
        age,
        preferredStartDate,
        guardianPhone,
        guardianEmail,
        programModule,
        category,
        specialNotes,
    };
};

const getGirlSafetyDto = (data) => {
    const {
        _id,
        participantName,
        participantEmail,
        participantPhone,
        age,
        preferredStartDate,
        preferredStartTime,
        guardianPhone,
        guardianEmail,
        programModule,
        createdBy,
        status,
        specialNotes,
    } = data;

    return {
        _id,
        participantName,
        participantEmail,
        participantPhone,
        age,
        preferredStartDate,
        preferredStartTime,
        guardianPhone,
        guardianEmail,
        programModule,
        createdBy,
        specialNotes,
        category
    };
};

function validateGirlSafetyFields(data) {
    const errors = {};

    // Participant Name validation
    if (!data.participantName || typeof data.participantName !== 'string' || data.participantName.trim().length < 1) {
        errors.participantName = "Participant name must be a valid string and cannot be empty.";
    }

    // Participant Email validation
    if (!data.participantEmail || typeof data.participantEmail !== 'string' || !/^\S+@\S+\.\S+$/.test(data.participantEmail)) {
        errors.participantEmail = "Participant email must be a valid email address.";
    }

    // Participant Phone validation
    if (!data.participantPhone || typeof data.participantPhone !== 'string' || !/^\d{10}$/.test(data.participantPhone)) {
        errors.participantPhone = "Participant phone must be a valid 10-digit number.";
    }

    // Age validation
    if (!data.age || typeof data.age !== 'string' || data.age <= 0) {
        errors.age = "Age must be a positive number.";
    }

    // Preferred Start Date validation
    if (!data.preferredStartDate || typeof data.preferredStartDate !== 'string') {
        errors.preferredStartDate = "Preferred start date must be a valid date.";
    }

    // Guardian Phone validation
    if (!data.guardianPhone || typeof data.guardianPhone !== 'string' || !/^\d{10}$/.test(data.guardianPhone)) {
        errors.guardianPhone = "Guardian phone must be a valid 10-digit number.";
    }

    // Guardian Email validation
    if (!data.guardianEmail || typeof data.guardianEmail !== 'string' || !/^\S+@\S+\.\S+$/.test(data.guardianEmail)) {
        errors.guardianEmail = "Guardian email must be a valid email address.";
    }

    // Program Module validation
    const validModules = ["self-defense", "hygine", "sanitary-products", "health-safety", "medical-assistance-guidance"];
    if (!data.programModule || !validModules.includes(data.programModule)) {
        errors.programModule = `Program module must be one of: ${validModules.join(', ')}.`;
    }

    if (!data.category || !validModules.includes(data.category)) {
        console.log(data.category);
        errors.category = `Category module must be one of: ${validModules.join(', ')}.`;
    }

    // Special Notes validation
    if (data.specialNotes && typeof data.specialNotes !== 'string') {
        errors.specialNotes = "Special notes must be a valid string.";
    }

    return errors;
}

module.exports = {
    createGirlSafetyDto,
    validateGirlSafetyFields,
    getGirlSafetyDto,
};
