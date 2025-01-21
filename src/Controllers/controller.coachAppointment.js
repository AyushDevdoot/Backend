const { createCoachAppointmentDto, validateCoachAppointmentFields } = require("../DTOs/coachAppointment.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { getCoachAllAppointmentsServices, createCoachAppointmentServices } = require("../Services/services.coachAppointment");
const { getCoachTimeSlotServices } = require("../Services/services.coachTimeSlot");

const createCoachAppointmentController = async (req, res) => {
    try {
        const coachAppointment = createCoachAppointmentDto(req.body);
        const errors = validateCoachAppointmentFields(coachAppointment);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }

        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const day = days[new Date(coachAppointment.date).getDay()];
        const coachSlotsAll = await getCoachTimeSlotServices(coachAppointment.coachId);

        const allSlotsForTheDay = coachSlotsAll.slot[`${day}`];
        if (!allSlotsForTheDay?.includes(coachAppointment.time)) {
            return sendResponse(res, null, 400, false, "Not a valid slot")
        } else {
            const coachAllAppointments = await getCoachAllAppointmentsServices(coachAppointment.coachId, coachAppointment.date);
            if (coachAllAppointments.length > 0) {
                for (let index = 0; index < coachAllAppointments.length; index++) {
                    if (coachAllAppointments[index].time === coachAppointment.time) {
                        return sendResponse(res, null, 400, false, "Appointment already exists")
                    } else {
                        await createCoachAppointmentServices({ ...coachAppointment, createdBy: req.user._id });
                        sendResponse(res, null, 201, true, "Coach appointment created successfully");
                        return
                    }
                }
            } else {
                await createCoachAppointmentServices({ ...coachAppointment, createdBy: req.user._id });
                sendResponse(res, null, 201, true, "Coach appointment created successfully");
                return
            }
        }

    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

// const getAllCoachAppointmentsController = async (req, res) => {
//     try {
//         const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
//         const coachSlotsAll = await getCoachTimeSlotServices(req.query.coachId);
//         const day = days[new Date(req.query.date).getDay()];
//         const allSlotsForTheDay = coachSlotsAll.slot[`${day}`];
//         const coachAppointments = await getCoachAllAppointmentsServices(req.query.coachId, req.query.date);
//         const allAvailableSlots = allSlotsForTheDay?.filter(slot => !coachAppointments.some(appointment => appointment.time === slot));
//         if (!allAvailableSlots?.length > 0) {
//             sendResponse(res, null, 200, true, "No available slots", [])
//             return
//         }
//         sendResponse(res, null, 200, true, "Coach appointments fetched successfully", allAvailableSlots);
//         return
//     } catch (err) {
//         console.log(err)
//         sendResponse(res, err);
//         return
//     }
// };

const getAllCoachAppointmentsController = async (req, res) => {
    try {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const coachSlotsAll = await getCoachTimeSlotServices(req.query.coachId);

        const day = days[new Date(req.query.date).getDay()];
        const allSlotsForTheDay = coachSlotsAll.slot[day];

        const coachAppointments = await getCoachAllAppointmentsServices(req.query.coachId, req.query.date);

        // Get booked slots
        const bookedSlots = coachAppointments.map(appointment => appointment.time);

        // Get available slots
        const availableSlots = allSlotsForTheDay?.filter(slot => !bookedSlots.includes(slot));

        // Prepare response data
        const responseData = {
            availableSlots: availableSlots || [],
            bookedSlots: bookedSlots || []
        };

        sendResponse(res, null, 200, true, "Coach appointments fetched successfully", responseData);
    } catch (err) {
        console.error(err);
        sendResponse(res, err, 500, false, "Error fetching coach appointments");
    }
};


module.exports = {
    createCoachAppointmentController,
    getAllCoachAppointmentsController
};
