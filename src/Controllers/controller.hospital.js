const hospitalService = require('../Services/services.hospital');
const { sendResponse } = require('../Helpers/helpers.commonFunc');

const getNearbyHospitalsController = async (req, res) => {
    try {
        const { latitude, longitude, radius, specialization, sortBy, type, minRating } = req.query;

        const hospitals = await hospitalService.fetchNearbyHospitals({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            radius: radius ? parseInt(radius) : 5000,
            specialization,
            sortBy,
            type,
            minRating: minRating ? parseFloat(minRating) : null
        });

        if (hospitals.length === 0) {
            return sendResponse(res, null, 200, false, 'No hospitals found in the specified area');
        }

        return sendResponse(res, hospitals, 200, true, 'Hospitals fetched successfully');
    } catch (error) {
        console.error('Error in getNearbyHospitalsController:', error.message);
        return sendResponse(res, error, 500, false, 'Error fetching hospitals');
    }
};

module.exports = { getNearbyHospitalsController };