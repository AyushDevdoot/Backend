const createSpecialistDto = (data) => {
    const { specialistServiceCategory, specialistServiceType, name, location, profileDescription, servicesOffered, rate, yearsOfExperience, isActive, createdBy } = data;
    return {
        specialistServiceCategory,
        specialistServiceType,
        name,
        location,
        profileDescription,
        servicesOffered,
        rate,
        yearsOfExperience,
    }
}

const validateSpecialistFields = (data) => {
    const errors = {};

    // specialistServiceCategory validation
    if (!data.specialistServiceCategory || typeof data.specialistServiceCategory !== 'string' || !data.specialistServiceCategory.match(/(nutrition|mental-health|diet-counselling|child-sponsorship|emergency-contact|hospital|corporate-health|girl-safety|health-checkup-package|user-dictonary|pet-care-form|ayurveda-consultation-form|first-aid-training|mental-health)/)) {
        errors.specialistServiceCategory = "specialistServiceCategory must be a valid string.";
    }

    // specialistServiceType validation
    if (!data.specialistServiceType || typeof data.specialistServiceType !== 'string' || !data.specialistServiceType.match(/(consultation|training|counselling|referral|other)/)) {
        errors.specialistServiceType = "specialistServiceType must be a valid string.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // location validation
    if (!data.location || typeof data.location !== 'string' || data.location.trim().length < 2) {
        errors.location = "location must be at least 2 characters long and a valid string.";
    }

    // profileDescription validation
    if (!data.profileDescription || typeof data.profileDescription !== 'string' || data.profileDescription.trim().length < 2) {
        errors.profileDescription = "profileDescription must be at least 2 characters long and a valid string.";
    }

    // servicesOffered validation
    if (!data.servicesOffered || typeof data.servicesOffered !== 'object') {
        errors.servicesOffered = "servicesOffered must be a array.";
    }

    // rate validation
    if (!data.rate || typeof data.rate !== 'number' || data.rate <= 0) {
        errors.rate = "rate must be a positive number.";
    }

    // yearsOfExperience validation
    if (!data.yearsOfExperience || typeof data.yearsOfExperience !== 'number') {
        errors.yearsOfExperience = "yearsOfExperience  must be a positive number.";
    }



    return errors;
}



const createNewSpecializationDto = (data) => {
    	const { specialization, isActive = true } = data;
	return { specialization, isActive :isActive }
}



const validateNewSpecialization = (data, specialization) => {
    const errors = {};

    // specialistServiceCategory validation
    if (!data.specialization || typeof data.specialization !== 'string') {
        errors.specialization = "specialization must be a valid string.";
    }

    if (specialization[data.specialization]){
	    errors.specialization = "Specialization Already Exists"
    }
    if (!data.isActive || typeof data.isActive !== 'boolean') {
        errors.isActive = "Specialization activation needs boolean or no value";
    }

    return errors;
}


const specializationSearchByIdDto = (data) => {
	const { id } = data;
    	return { id };
}

const specializationSearchBy_idDto = (data) => {
	const { id } = data;
	return { _id : id };
}

const validateSpecializationId = (data) => {
	if (!(data.id - 0 ) || typeof (data.id - 0) !== 'Number') {
		errors.id = "id must be a valid Number";
    	}
	return errors
}

const validateSpecialization_id = (data) => {
	const hex = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
	  '7': 7, '8': 8, '9': 9, 'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14,
	  'f': 15 
	}
	count=0
	for (let char of data._id){
		if (!hex[char]){
			errors._id = "Invaid _id";
		}
		count++;
	}
	if (!data._id || count !== 24) {
        	errors._id = "_id must be a valid mongo db id";
	}
	return errors
}


module.exports = {
    createSpecialistDto,
    validateSpecialistFields,
    createNewSpecializationDto,
    validateNewSpecialization,
    specializationSearchByIdDto,
    specializationSearchBy_idDto,
    validateSpecializationId,
    validateSpecialization_id
};
