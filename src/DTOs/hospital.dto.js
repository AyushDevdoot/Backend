const createHospitalDto = (data) => {
    const {
        hospitalName,
        contactNumber,
        streetAddress,
        area,
        district,
        city,
        state,
        country,
        pincode,
        latitude,
        longitude,
        hospitalType,
        category,
        doctors,
        specialitiesOffered,
        servicesOffered,
        packages,
        review,
        email,
        website,
        faq,
        opdTimings,
        ambulanceCount
    } = data;

    return {
        hospitalName,
        contactNumber,
        streetAddress,
        area,
        district,
        city,
        state,
        country,
        pincode,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude]
        },
        hospitalType,
        category,
        doctors,
        specialitiesOffered,
        servicesOffered,
        packages,
        review,
        email,
        website,
        faq,
        opdTimings,
        ambulanceCount
    };
};

function validateHospitalFields(data) {
    const errors = {};

    if (!data.hospitalName || typeof data.hospitalName !== 'string' || data.hospitalName.trim().length < 2) {
        errors.hospitalName = "Hospital name must be at least 2 characters long";
    }

    if (!data.contactNumber || typeof data.contactNumber !== 'string') {
        errors.contactNumber = "Valid contact number is required";
    }

    if (!data.latitude || !data.longitude) {
        errors.location = "Latitude and longitude are required";
    } else if (
        typeof data.latitude !== 'number' || 
        typeof data.longitude !== 'number' ||
        data.latitude < -90 || data.latitude > 90 ||
        data.longitude < -180 || data.longitude > 180
    ) {
        errors.location = "Invalid coordinates";
    }

    if (!data.hospitalType || !['private', 'government'].includes(data.hospitalType)) {
        errors.hospitalType = "Hospital type must be either 'private' or 'government'";
    }

    if (!data.category || !['critical-care', 'surgery', 'maternity', 'speciality', 'mental-health', 'burn', 'veterinary', 'geriatric-care'].includes(data.category)) {
        errors.category = "Invalid hospital category";
    }

    // Add other validations as needed

    return errors;
}

const updateHospitalDto = (data) => {
    const updateData = {};
    
    const allowedFields = [
        'hospitalName',
        'contactNumber',
        'streetAddress',
        'area',
        'district',
        'city',
        'state',
        'country',
        'pincode',
        'latitude',
        'longitude',
        'hospitalType',
        'category',
        'doctors',
        'specialitiesOffered',
        'servicesOffered',
        'packages',
        'review',
        'email',
        'website',
        'faq',
        'opdTimings',
        'ambulanceCount'
    ];

    allowedFields.forEach(field => {
        if (data[field] !== undefined) {
            if (field === 'latitude' || field === 'longitude') {
                if (!updateData.location) {
                    updateData.location = {
                        type: 'Point',
                        coordinates: [data.longitude, data.latitude]
                    };
                }
            } else {
                updateData[field] = data[field];
            }
        }
    });

    return updateData;
};

module.exports = {
    createHospitalDto,
    validateHospitalFields,
    updateHospitalDto
};