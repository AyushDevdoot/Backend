const { createCoachAvailabilityServices, getCoachAllAvailabilityServices, getCoachAvailabilityOfDayServices } = require("../../Services/services.coachAvailability");
const { createCoachAvailabilityDto, validateCoachAvailability, getCoachAvailabilityDto, validateGetCoachAvailabilityDto } = require('../../DTOs/coachAvailability.dto');

const addCoachAvailabilityController = async (req, res) => {
    try {
        if (! Array.isArray(req.body)){
            sendResponse(res, null, )
        }
        let availability = [];
        let errors = {};

        for (let data of req.body){
            const availability_data = createCoachAvailabilityDto(data);
            errors = validateCoachAvailability(availability_data);
            availability.push(availability_data)
        }
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 400, false, '');
            return
        }

        let result = await createCoachAvailabilityServices(availability);
        console.log(result);
        sendResponse(res, null, 201, true, 'successfully added',result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }

};


const getCoachAllAvailabilityController = async (req, res) => {
    try {
        const id = req.params.id;
        const availability_data = createCoachAvailabilityDto({ coachId: id });
        const errors = validateGetCoachAvailabilityDto(availability_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 400, false, '');
            return
        }

        let result = await getCoachAllAvailabilityServices(availability_data);
        sendResponse(res, null, 201, true, 'success',result);
    }catch (err) {
        sendResponse(res, err, 500);
    }

};


module.exports = {
    addCoachAvailabilityController,
    getCoachAllAvailabilityController,
};
