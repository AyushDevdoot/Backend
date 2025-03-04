const { createBookingServices, getBookingByIdService, getUserBookingHistoryServices } = require('../../Models/models.booking')
const { createBookingDto, validateCreateBookingDto, getAppointmentsByUserIdDto } = require('../../DTOs/booking.dto');

const createAppointmentController = async (req, res) =>{
	try{
		let booking_data = createBookingDto(req.body);
		let errors = validateCreateBookingDto(booking_data);

		if (Object.keys(errors).length > 0) {
		    sendResponse(res, null, 400, false, errors);
		    return
		}

		let booking =  await createBookingServices(booking_data); 
        	sendResponse(res, null, 201, true, 'successfully added',booking);
		return 
		
	}catch(err){
		console.error(err);
        	sendResponse(res, err, 500);
		throw err;
	}
}


const getAppointmentHistoryController = async (req, res) => {

	try{
		let user_data = getAppointmentsByUserIdDto(req.query.id);
		let errors = validateGetUserAppointmentsDto(user_data);

		if (Object.keys(errors).length > 0) {
		    sendResponse(res, null, 400, false, errors);
		    return
		}

		let booking =  await getUserBookingHistoryServices(booking_data); 
        	sendResponse(res, null, 201, true, 'successfully added',booking);
		return 
		
	}catch(err){
		console.error(err);
        	sendResponse(res, err, 500);
		throw err;
	}

};


module.exports = {
	createAppointmentController,
	getAppointmentHistoryController
};
