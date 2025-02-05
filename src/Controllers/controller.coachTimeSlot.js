const { createCoachTimeslotDto, validateCoachTimeslotFields } = require("../DTOs/coachTimeSlot.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const {generateTimeSlots} = require("../Helpers/helpers.generateSlots")
const { createCoachTimeSlotServices, getCoachTimeSlotServices } = require("../Services/services.coachTimeSlot");

const createCoachTimeSlotController = async (req, res) => {
    try {
        const coachTimeSlot = createCoachTimeslotDto(req.body);
        // const errors = validateCoachTimeslotFields(coachTimeSlot);
        // if (Object.keys(errors).length > 0) {
        //     sendResponse(res, null, 400, false, errors);
        //     return
        // }
        await createCoachTimeSlotServices({ ...coachTimeSlot, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Coach time slot created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getCoachTimeSlotController = async (req, res) => {
    try {
        const coachTimeSlot = await getCoachTimeSlotServices(req.params.coachId);
        if (!coachTimeSlot) {
            sendResponse(res, null, 400, false, "Coach time slot not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Coach time slot fetched successfully", coachTimeSlot);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateCoachTimeSlotController = async (req, res) => {
    try {
        const coachTimeSlot = await getCoachTimeSlotByIdServices(req.params.coachId, req.params.timeSlotId);
        if (!coachTimeSlot) {
            sendResponse(res, null, 400, false, "Coach time slot not found");
            return
        } else {
            const coachTimeSlotBody = updateCoachTimeSlotDto(req.body, coachTimeSlot);
            await updateCoachTimeSlotServices(coachTimeSlot._id, coachTimeSlotBody);
            sendResponse(res, null, 200, true, "Coach time slot updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const deleteCoachTimeSlotController = async (req, res) => {
    try {
        const coachTimeSlot = await getCoachTimeSlotByIdServices(req.params.coachId, req.params.timeSlotId);
        if (!coachTimeSlot) {
            sendResponse(res, null, 400, false, "Coach time slot not found");
            return
        } else {
            await deleteCoachTimeSlotServices(coachTimeSlot._id);
            sendResponse(res, null, 200, true, "Coach time slot deleted successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createCoachTimeSlotController,
    getCoachTimeSlotController,
    updateCoachTimeSlotController,
    deleteCoachTimeSlotController
};