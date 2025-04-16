const  LockSlotModel = require("../Models/models.lockTimeSlot");

const createLockServices = async (lock) => {
	console.log(lock);
	return await LockSlotModel({coachId: lock.coachId, startTime: lock.startDate, endTime: lock.endDate}).save();
};

const getLockService = async ( {coachId, startTime, endTime} ) =>{
	const start = new Date(startTime);
	const end = new Date(endTime);

	if (isNaN(start) || isNaN(end)){
		throw new Error('Invalid StartTime or EndTime');
	}
	let locks = await LockSlotModel.find({coachId: coachId, startTime: start, endTime: end}).sort({endTime: 1});

	return locks;
};

const isLockedService = async ( {coachId, startTime, endTime} ) => {
  	const start = new Date(startTime);
  	const end = new Date(endTime);

  	// Check if both dates are valid
  	if (isNaN(start) || isNaN(end)) {
    		throw new Error('Invalid startTime or endTime provided');
	}
	let lock = await LockSlotModel.findOne(
		{
			coachId, 
			startTime: { $lt: end }, 
			endTime: { $gt: start },
			lockedUntil: { $gt: new Date() }
		}
	);
	return lock
};

module.exports = {
	createLockServices,
	getLockService,
	isLockedService
}

