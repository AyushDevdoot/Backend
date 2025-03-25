const HospitalModel = require("../Models/models.hospital");

const createHospitalServices = async (hospital) => {
    const finalBody = new HospitalModel(hospital);
    return await finalBody.save();
};

const getHospitalByQueryServices = async ({
    latitude,
    longitude,
    category,
    hospitalType,
    searchTerm,
    sortBy,
    maxDistance = 50000 // Default 50km radius
}) => {
    let query = {};

    if (latitude && longitude) {
        query.location = {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: maxDistance
            }
        };
    }

    if (category && category !== 'all') {
        query.category = category;
    }

    if (hospitalType && hospitalType !== 'all') {
        query.hospitalType = hospitalType;
    }

    if (searchTerm) {
        query.hospitalName = new RegExp(searchTerm, 'i');
    }

    const aggregationPipeline = [
        { $match: query },
        {
            $addFields: {
                distance: {
                    $cond: {
                        if: { $and: [{ $exists: ['$location'] }, { $exists: [latitude] }, { $exists: [longitude] }] },
                        then: {
                            $divide: [
                                {
                                    $distance: {
                                        from: { type: 'Point', coordinates: [longitude, latitude] },
                                        to: '$location'
                                    }
                                },
                                1000
                            ]
                        },
                        else: null
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                hospitalName: 1,
                city: 1,
                streetAddress: 1,
                area: 1,
                district: 1,
                state: 1,
                pincode: 1,
                category: 1,
                hospitalType: 1,
                review: 1,
                opdTimings: 1,
                distance: 1,
                latitude: { $arrayElemAt: ['$location.coordinates', 1] },
                longitude: { $arrayElemAt: ['$location.coordinates', 0] },
                contactNumber: 1,
                email: 1,
                website: 1
            }
        }
    ];

    if (sortBy) {
        switch (sortBy) {
            case 'distance':
                aggregationPipeline.push({ $sort: { distance: 1 } });
                break;
            case 'rating':
                aggregationPipeline.push({ $sort: { review: -1 } });
                break;
        }
    }

    return await HospitalModel.aggregate(aggregationPipeline);
};

const getHospitalByIdServices = async (hospitalId) => {
    return await HospitalModel.findById(hospitalId);
};

const updateHospitalServices = async (hospitalId, updateData) => {
    return await HospitalModel.findByIdAndUpdate(hospitalId, updateData, { new: true });
};

module.exports = {
    createHospitalServices,
    getHospitalByQueryServices,
    getHospitalByIdServices,
    updateHospitalServices
};