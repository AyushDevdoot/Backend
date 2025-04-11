const  LockSlotModel = require("../Models/models.lockTimeSlot");

const createLockServices = async (lock) => {
	return await LockSlotModel(lock).save();
};

const isLockedService = async ( {coachId, startTime, endTime} ) => {
	return ! await LockSlotModel.findOne(
		{
			coachId, 
			startTime: { $lt: endTime }, 
			endTime: { $gt: startTime },
			lockedUntil: { $gt: new Date() }
		}
	);

};

module.exports = {
	createLockServices,
	isLockedService
}

