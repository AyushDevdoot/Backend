const { createBookingServices, getBookingByIdService, getUserBookingHistoryServices, updateBookingServices, updatePaymentStatusBookingServices } = require('../../Services/services.booking')
const { acquireBookingLock, isbookingLocked } = require('../../Services/services.bookingProcess');
const { createBookingDto, validateCreateBookingDto, getAppointmentsByUserIdDto, updateStatusDto, ValidateStatusDto } = require('../../DTOs/booking.dto');



const createAppointmentController = async (req, res) =>{
	// data in Am pm format  in utc time, will be converted to utc 24 hour format
	try{
		
		let booking_data = createBookingDto(req.body);
		let errors = validateCreateBookingDto(booking_data);
		let isLocked = await isbookingLocked(booking_data.coachId, booking_data.startTime); 
		if (isLocked){
			sendResponse(res, null, 409, false, "Slot Unavailable")
		}
		if (Object.keys(errors).length > 0) {
		    sendResponse(res, null, 400, false, errors);
		    return
		}

		let booking =  await createBookingServices(booking_data); 
		await acquireBookingLock(booking._id, booking.coachId, booking.startTime, booking.endTime);//return true or false
        sendResponse(res, null, 201, true, 'successfully added',booking);
		return 
		
	}catch(err){
		console.error(err);
        	sendResponse(res, err, 500);
		throw err;
	}
}


const updateAppointmentPaymentStatusController = async (req, res) =>{
	// id of the booking , user id and payment status ,only payment status update
	try{
		let booking_data = updateStatusDto(req.body);
		let errors = ValidateStatusDto(booking_data);

		if (Object.keys(errors).length > 0) {
		    sendResponse(res, null, 400, false, errors);
		    return
		}
		let update = 'successfully cancelled';
		if (!booking_data.isPaid){
			await updatePaymentStatusBookingServices(booking_data.id, booking_data.paymentStatus); 
		}else{
			await updatePaymentStatusBookingServices(booking_data.id, booking_data.paymentStatus); 

		}
		await removeFromBookingProcess(booking_data.id, booking_data.coachId, booking_data.startTime, booking_data.endTime);

        sendResponse(res, null, 201, true, update);
		return 
		
	}catch(err){
		console.error(err);
        	sendResponse(res, err, 500);
		throw err;
	}
}

const updateAppointmentController = async (req, res) =>{
	// updating whole appointment meaning data time etc
	try{
		let booking_data = updateStatusDto(req.body);
		let errors = ValidateStatusDto(booking_data);
		if (Object.keys(errors).length > 0) {
		    sendResponse(res, null, 400, false, errors);
		    return
		}
		let booking = await updateBookingServices(booking_data)
        sendResponse(res, null, 201, true, 'successfully added',booking);
		return 
	}catch (err){

        sendResponse(res, err, 500);
		throw err;
		
	}
};

const getAppointmentHistoryController = async (req, res) => {
	// appointement history of user 
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
	updateAppointmentPaymentStatusController,
	updateAppointmentController,
	getAppointmentHistoryController
};
