const { createCoachAvailabilityServices, getCoachAllAvailabilityServices, getCoachAvailabilityOfDayServices, updateCoachAvailabilityOfDayServices} = require("../../Services/services.coachAvailability");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const { createCoachAvailabilityDto, validateCoachAvailability, getCoachAvailabilityDto, validateGetCoachAvailabilityDto, updateCoachAvailabilityDto, vaildateUpdateCoachAvailability } = require('../../DTOs/coachAvailability.dto');

const addCoachAvailabilityController = async (req, res) => {
    // supports both adding new and updating old
    try {
        if (! Array.isArray(req.body.availability)){
            sendResponse(res, null, 400, false, 'Invalid data');
        }
        let availability = [];
        let errors = {};
        let coachId = req.body.coachId
        for (let data of req.body.availability){
            const availability_data = createCoachAvailabilityDto({...data, coachId });
            errors = validateCoachAvailability(availability_data);
		if (Object.keys(errors).length > 0){
		    sendResponse(res, null, 400, false, errors);
		    return
		}
            availability.push(availability_data)
        }

        const result = await createCoachAvailabilityServices(availability);
        sendResponse(res, null, 201, true, 'successfully added',result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }

};


const getCoachAllAvailabilityController = async (req, res) => {
    try {
        const id = req.query.id;
        const availability_data = getCoachAvailabilityDto({ coachId: id });
        const errors = validateGetCoachAvailabilityDto(availability_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 400, false, errors);
            return
        }
        console.log(availability_data);
        let result = await getCoachAllAvailabilityServices(availability_data);
        let available = result.map((data)=>{
            if (data.isAvailable){
                return data
            }
        });
        sendResponse(res, null, 201, true, 'success', available);
    }catch (err) {
        console.log(err)
        sendResponse(res, err, 500);
    }

};


const updateCoachAvailabilityController = async (req, res) =>{
    // can update start time, end time not available  
    try {
        const availability_data = updateCoachAvailabilityDto(req.body);
        const errors = vaildateUpdateCoachAvailability(availability_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 400, false, errors);
            return
        }

        let result = await updateCoachAvailabilityOfDayServices({ 
            _id: availability_data.id,
            coachId: availability_data.coachId,
            day: availability_data.day
        },
        {
                startTime: availability_data.startTime,
                endTime: availability_data.endTime,
                isAvailable: availability_data.isAvailable
        });
        sendResponse(res, null, 201, true, 'success',result);
    }catch (err) {
        sendResponse(res, err, 500, false, 'server Internal error');
    }

};


module.exports = {
    addCoachAvailabilityController,
    getCoachAllAvailabilityController,
    updateCoachAvailabilityController,
};
