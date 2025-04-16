const { getLockService } = require("../Services/servcies.lockSlot");


const isLocked = async ({ coachId, startDate, endDate, start, end }) => {
	//data fetched will be in ascending order
	let locks = await getLockService({ coachId, startTime: startDate, endTime: endDate });
	start = new Date(start);
	end = new Date(end);

	for (let lock of locks){
		let endDate = new Date(lock.endTime);
		if (endDate.getDate() != start.getDate()){
			continue;
		}
		let startDate = new Date(lock.startTime)
		if (end > startDate && endDate > start){
			return true
		}
	}
	return false;
};


module.exports = {
	isLocked
}
