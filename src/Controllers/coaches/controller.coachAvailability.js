const { createCoachAvailabilityServices, getCoachAllAvailabilityServices, getCoachAvailabilityOfDayServices, updateCoachAvailabilityOfDayServices} = require("../../Services/services.coachAvailability");
const { createCoachAvailabilityDto, validateCoachAvailability, getCoachAvailabilityDto, validateGetCoachAvailabilityDto, updateCoachAvailabilityDto, vaildateUpdateCoachAvailability } = require('../../DTOs/coachAvailability.dto');

const addCoachAvailabilityController = async (req, res) => {
    try {
        if (! Array.isArray(req.body.availability)){
            sendResponse(res, null, 400, false, 'Invalid data');
        }
        let availability = [];
        let errors = {};
        let coachId = req.body.id

        for (let data of req.body.availability){
            const availability_data = createCoachAvailabilityDto({...data, coachId });
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


const updateCoachAvailabilityController = async (req, res) =>{
    // can update start time, end time not available  
    try {
        const availability_data = updateCoachAvailabilityDto(req.body);
        const errors = vaildateUpdateCoachAvailability(availability_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 400, false, '');
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
