const createChildSponsorFormDto = (data) => {
    const { childId, name, email, mobile, notes } = data;
    return {
        childId,
        name,
        email,
        mobile,
        notes
    }
}

function validateChildSponsorForm(data) {
    const errors = {};

    // childId validation
    if (!data.childId || typeof data.childId !== 'string' || data.childId.trim().length < 1) {
        errors.childId = "childId must be a valid string and cannot be empty.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
        errors.name = "Name must be a valid string and cannot be empty.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string' || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
        errors.email = "Email must be a valid email address.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || !/^\+?\d{10,15}$/.test(data.mobile)) {
        errors.mobile = "Mobile must be a valid phone number (10-15 digits).";
    }



    return errors;
}


module.exports = {
    createChildSponsorFormDto,
    validateChildSponsorForm
};