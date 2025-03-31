const createChildSponsorDto = (data) => {
    const { name, age, profile, description, profileImg } = data;
    return {
        name,
        age,
        profile,
        description,
        profileImg
    }
}

function validateChildSponsorFields(data) {
    const errors = {};

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
        errors.name = "Name must be a valid string and cannot be empty.";
    }

    // age validation
    if (!data.age || typeof data.age !== 'number' || data.age <= 0) {
        errors.age = "Age must be a positive number.";
    }

    // profile validation
    if (!data.profile || typeof data.profile !== 'string' || data.profile.trim().length < 1) {
        errors.profile = "Profile must be a valid string and cannot be empty.";
    }

    // description validation
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 1) {
        errors.description = "Description must be a valid string and cannot be empty.";
    }

    // profileImg validation
    if (!data.profileImg || typeof data.profileImg !== 'string' || !/^https?:\/\/[^\s]+$/.test(data.profileImg)) {
        errors.profileImg = "Profile image must be a valid URL.";
    }

    return errors;
}

const getChildSponsorDto = (data) => {
    const { name, age, profile, description, profileImg, _id } = data;
    return {
        _id,
        name,
        age,
        profile,
        description,
        profileImg
    }
}
module.exports = {
    createChildSponsorDto,
    validateChildSponsorFields,
    getChildSponsorDto
};