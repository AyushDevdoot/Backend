
const CoachAvailabilityModel = require("../Models/models.coachAvailability");

const createCoachAvailabilityServices = async (availability) => {

	const bulkOperations = availability.map(data => ({
		updateOne: {
			filter: {
				coachId: data.coachId,
				day: data.day,
			}, // find fields
			update: {
				$set: { 
					isAvailable: data.isAvailable,
					startTime: data.startTime,
					endTime: data.endTime,
				}  // Set the fields to update
			},
			upsert: true // If the document doesn't exist, insert a new one
		}
	}));
	return await CoachAvailabilityModel.bulkWrite(bulkOperations);
}

const getCoachAllAvailabilityServices = async (coachId) => {
	return await CoachAvailabilityModel.find(coachId);
}

const getCoachAvailabilityOfDayServices = async (coachId, day) => {
	return await CoachAvailabilityModel.findOne({ coachId, day })
}

const updateCoachAvailabilityOfDayServices = async (search, update) => {
	return await CoachAvailabilityModel.findOneAndUpdate(search, { $set: update }, { new: true })
}

module.exports = {
	createCoachAvailabilityServices,
	getCoachAllAvailabilityServices,
	getCoachAvailabilityOfDayServices,
	updateCoachAvailabilityOfDayServices
}
