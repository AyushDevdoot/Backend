const createSpecialistFormDto = (data) => {
    const { name, email, specialistId, mobile, age, preferredDate, preferredTime, specialNotes, createdBy } = data;
    return {
        name,
        email,
        mobile,
        age,
        preferredDate,
        specialistId,
        preferredTime,
        specialNotes,
    }
}

const validateSpecialistForm = (data) => {
    const errors = {};

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string' || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
        errors.email = "Email must be a valid email address.";
    }



    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || !/^\+?\d{10,15}$/.test(data.mobile)) {
        errors.mobile = "Mobile must be a valid phone number (10-15 digits).";
    }

    // age validation
    if (!data.age || typeof data.age !== 'string' || data.age <= 0) {
        errors.age = "Age must be a valid string";
    }

    // specialistId validation
    if (!data.specialistId || typeof data.specialistId !== 'string' || data.specialistId.trim().length < 2) {
        errors.specialistId = "specialistId must be at least 2 characters long and a valid string.";
    }

    // preferredDate validation
    if (!data.preferredDate || typeof data.preferredDate !== 'string' || data.preferredDate.trim().length < 2) {
        errors.preferredDate = "preferredDate must be at least 2 characters long and a valid string.";
    }

    // preferredTime validation
    if (!data.preferredTime || typeof data.preferredTime !== 'string' || data.preferredTime.trim().length < 2) {
        errors.preferredTime = "preferredTime must be at least 2 characters long and a valid string.";
    }


    return errors;
}

module.exports = {
    createSpecialistFormDto,
    validateSpecialistForm
};