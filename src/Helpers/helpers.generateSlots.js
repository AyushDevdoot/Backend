//const { expose } = require('worker');

const generateTimeSlots = (start, end, coachInfo, availability, bookedSlots) => {
	//bookedSlots removing
	const slots = {};
	const BUFFER_TIME_SELECTION = 60; // minute
	//this time will be used to move the time so that we dont give anyone ability to select current 
	//time for booking
	let availability_map = {}
	//create a map to fetch details using day.
	if (!Array.isArray(availability)){
		throw new TypeError(`Expected availability to be an array, got: ${typeof availability}`);
	}
	for (let av of availability){
		if (!av.isAvailable){
			continue;
		}
		availability_map[av.day] = [av.startTime, av.endTime];
	}
	const { sessionTime, timeZone } = coachInfo;
	const array_getWeekDay_Range = getWeekDaysInRange(start, end, timeZone);
	for (const [day, date] of array_getWeekDay_Range){
		if(! availability_map[day]){
			continue;
		}
		[start, end] = availability_map[day];
		console.log(start,end);
		//start and end are in iso format so dont need conversion
		//but will need to get hr and min 
		let daySlots = [];
		console.log(new Date(start).getTime().toString())
		start = new Date(start);
		end = new Date(end);
		let [startHour, startMinute] = [start.getHours(), start.getMinutes()]//convertTo24Hour(new Date(start).getTime());

		const [endHour, endMinute] = [end.getHours(), end.getMinutes()] //convertTo24Hour(end);
		let totalStartMinutes = startHour * 60 + parseInt(startMinute);
		let totalEndMinutes = endHour * 60 + parseInt(endMinute);
		console.log(totalStartMinutes, sessionTime)
		while (totalStartMinutes + sessionTime <= totalEndMinutes) {
			console.log('workin?')
			let slotStartHour = Math.floor(totalStartMinutes / 60);
			let slotStartMinute = totalStartMinutes % 60;
			let slotEndMinutes = totalStartMinutes + sessionTime;
			let slotEndHour = Math.floor(slotEndMinutes / 60);
			let slotEndMinute = slotEndMinutes % 60;

			daySlots.push({
				startTime: formatTime(slotStartHour, slotStartMinute),
				endTime: formatTime(slotEndHour, slotEndMinute)
			});

			totalStartMinutes += sessionTime;
		}
		if (totalEndMinutes - totalStartMinutes > 0){
			let slotStartHour = Math.floor(totalStartMinutes / 60);
			let slotStartMinute = totalStartMinutes % 60;
			let slotEndMinutes = totalStartMinutes + (totalEndMinutes - totalStartMinutes);
			let slotEndHour = Math.floor(slotEndMinutes / 60);
			let slotEndMinute = slotEndMinutes % 60;
			daySlots.push({
				startTime: formatTime(slotStartHour, slotStartMinute),
				endTime: formatTime(slotEndHour, slotEndMinute)
			})

		}
		slots[date] = daySlots;

	}
	// result of this will only return time slot will produce starting time to complete
	// meaning if we have 9.30 to 11:00 slot will be generated for 9.30 to 10.30 .
	return slots;
}

const getWeekDaysInRange = (start,end, timeZone) => {
	console.log(start, end);
	let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	start = new Date(new Date(start).toLocaleString("en-US", timeZone));
	end = new Date(new Date(end).toLocaleString("en-US", timeZone));

	let day_date = []
	for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)){
		day_date.push([weekDays[currentDate.getDay()],currentDate.toISOString()]);
		console.log(currentDate)

	}
	return day_date;
};

const convertTo24Hour = (time) => {
	// converts time AM/PM time to 24 hour time
	time = time.toUpperCase();
	if (! (time.includes('AM') || time.includes('PM'))){
		return time.split(':')
	}
	const [hour, minutePart] = time.split(':');
	minutePart = minutePart.split(' ')
	const minutes = minutePart[0];
	const period = minutePart[1];

	let hourIn24 = parseInt(hour);
	if (period === 'PM' && hourIn24 < 12) hourIn24 += 12;
	if (period === 'AM' && hourIn24 === 12) hourIn24 = 0;

	return [hourIn24, minutes];
}

const formatTime = (hour, minute) => {
	//24hour time to AM/PM time
	const period = hour >= 12 ? "PM" : "AM";
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	const formattedMinute = minute.toString().padStart(2, '0');
	return `${formattedHour}:${formattedMinute} ${period}`;
}

let availability = [
	{
		"coachId": "661670f2e28b1a7e9cd77abc",
		"day": "Monday",
		"startTime": "09:00",
		"endTime": "11:00",
		"isAvailable": true
	},
	{
		"coachId": "661670f2e28b1a7e9cd77abc",
		"day": "Tuesday",
		"startTime": "09:00",
		"endTime": "11:00",
		"isAvailable": true
	},
	{
		"coachId": "661670f2e28b1a7e9cd77abc",
		"day": "Wednesday",
		"startTime": "14:00",
		"endTime": "16:00",
		"isAvailable": true
	},
	{
		"coachId": "661670f2e28b1a7e9cd77abc",
		"day": "Thursday",
		"startTime": "13:00",
		"endTime": "15:00",
		"isAvailable": true
	},
	{
		"coachId": "661670f2e28b1a7e9cd77abc",
		"day": "Friday",
		"startTime": "10:30",
		"endTime": "12:00",
		"isAvailable": false
	},
	{
		"coachId": "661670f2e28b1a7e9cd77abc",
		"day": "Saturday",
		"startTime": "08:00",
		"endTime": "10:00",
		"isAvailable": true
	}
]

//expose({
//	generateTimeSlots,
//});
//
//console.log(JSON.stringify(generateTimeSlots(availability, '60', {})));

module.exports = { generateTimeSlots };

