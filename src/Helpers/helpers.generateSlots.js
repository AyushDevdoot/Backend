//const { expose } = require('worker');
const Deque = require('./helper.dequeue');
const { isLocked } = require('./helper.overlap');


//const generateTimeSlots = (start, end, coachInfo, availability, bookedSlots) => {
//	//let que = new Deque()
//	//for (let slots of bookedSlots){
//	//	que.push({'start': slots.startTime, 'end': slots.endTime});
//	//}
//
//	//bookedSlots removing
//	const slots = {};
//	const BUFFER_TIME_SELECTION = 30; // minute
//	//this time will be used to move the time so that we dont give anyone ability to select current 
//	//time for booking
//	let availability_map = {}
//	//create a map to fetch details using day.
//	if (!Array.isArray(availability)){
//		throw new TypeError(`Expected availability to be an array, got: ${typeof availability}`);
//	}
//	for (let av of availability){
//		if (!av.isAvailable){
//			continue;
//		}
//		availability_map[av.day] = [av.startTime, av.endTime];
//	}
//	const { sessionTime, timeZone } = coachInfo;
//	const array_getWeekDay_Range = getWeekDaysInRange(start, end, timeZone);
//	for (const [day, date] of array_getWeekDay_Range){
//		if(! availability_map[day]){
//			continue;
//		}
//		//start time from availability
//		[aStart, aEnd] = availability_map[day];
//		//start and end are in iso format so dont need conversion
//		//but will need to get hr and min 
//		let daySlots = [];
//		avStart = new Date(aStart);
//		avEnd = new Date(aEnd);
//		console.log(avStart<start);
//		if (avStart < new Date(start)){
//			console.log('ran ?')
//			avStart = new Date(start)
//			let minutes = avStart.getMinutes();
//			const remainder = 30 - (minutes%30);
//			avStart.setMinutes(minutes+remainder + BUFFER_TIME_SELECTION);
//		}
//		//TODO: correct this for if date is same and time starting of the coach is is 9 and we are taking 
//		//12:29 it should adjust it with buffer;
//		let [startHour, startMinute] = [avStart.getUTCHours(), avStart.getUTCMinutes()]//convertTo24Hour(new Date(start).getTime());
//
//		const [endHour, endMinute] = [avEnd.getUTCHours(), avEnd.getUTCMinutes()] //convertTo24Hour(end);
//		let totalStartMinutes = startHour * 60 + parseInt(startMinute);
//		let totalEndMinutes = endHour * 60 + parseInt(endMinute);
//		while (totalStartMinutes + sessionTime <= totalEndMinutes) {
//			const slotStartHour = Math.floor(totalStartMinutes / 60);
//			const slotStartMinute = totalStartMinutes % 60;
//			const slotEndMinutes = totalStartMinutes + sessionTime;
//			const slotEndHour = Math.floor(slotEndMinutes / 60);
//			const slotEndMinute = slotEndMinutes % 60;
//			// Create full Date objects for slot start/end
//			const slotStartTime = new Date(new Date(date).setHours(slotStartHour, slotStartMinute, 0, 0));
//			const slotEndTime = new Date(new Date(date).setHours(slotEndHour, slotEndMinute, 0,0));
//			const isBooked = bookedSlots.some(booked => {
//				const bookedStart = new Date(booked.startTime);
//				const bookedEnd = new Date(booked.endTime);
//				console.log(slotEndTime > bookedStart && slotStartTime < bookedEnd)
//				return slotEndTime > bookedStart && slotStartTime < bookedEnd;
//			});
//
//			if (!isBooked) {
//				daySlots.push({
//					startTime: slotStartTime.toISOString(),//formatTime(slotStartHour, slotStartMinute),
//					endTime: slotEndTime.toISOString()//formatTime(slotEndHour, slotEndMinute)
//				});
//			}
//
//			totalStartMinutes += sessionTime;
//		}
//		if (totalEndMinutes - totalStartMinutes > 0){
//			let slotStartHour = Math.floor(totalStartMinutes / 60);
//			let slotStartMinute = totalStartMinutes % 60;
//			let slotEndMinutes = totalStartMinutes + (totalEndMinutes - totalStartMinutes);
//			let slotEndHour = Math.floor(slotEndMinutes / 60);
//			let slotEndMinute = slotEndMinutes % 60;
//			daySlots.push({
//				startTime: formatTime(slotStartHour, slotStartMinute),
//				endTime: formatTime(slotEndHour, slotEndMinute)
//			})
//		}
//		slots[date] = daySlots;
//
//	}
//	// result of this will only return time slot will produce starting time to complete
//	// meaning if we have 9.30 to 11:00 slot will be generated for 9.30 to 10.30 .
//	return slots;
//}

const getWeekDaysInRange = (start,end, timeZone) => {
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


function generateTimeSlots(start, end, coachInfo, availability, bookedSlots) {
	const sessionTime = coachInfo.sessionTime; // in minutes
	const slots = {};

	const availabilityMap = {};
	for (const av of availability) {
		if (av.isAvailable) {
			availabilityMap[av.day] = [new Date(av.startTime), new Date(av.endTime)];
		}
	}

	const current = new Date(start);

	while (current <= end) {
		const dayName = current.toLocaleDateString("en-US", {
			weekday: "long",
			timeZone: "UTC",
		});

		if (!availabilityMap[dayName]) {
			current.setDate(current.getDate() + 1);
			continue;
		}

		let [avStart, avEnd] = availabilityMap[dayName];
		// Set correct date (because the availability startTime has fixed day)
		avStart = new Date(
			Date.UTC(
				current.getUTCFullYear(),
				current.getUTCMonth(),
				current.getUTCDate(),
				avStart.getUTCHours(),
				avStart.getUTCMinutes()
			)
		);
		avEnd = new Date(
			Date.UTC(
				current.getUTCFullYear(),
				current.getUTCMonth(),
				current.getUTCDate(),
				avEnd.getUTCHours(),
				avEnd.getUTCMinutes()
			)
		);

		const dayKey = avStart.toISOString(); 
		const daySlots = [];

		let slotStart = new Date(avStart);

		while (slotStart.getTime() + sessionTime * 60000 <= avEnd.getTime()) {
			const slotEnd = new Date(slotStart.getTime() + sessionTime * 60000);

			const isBooked = bookedSlots.some((booked) => {
				const bookedStart = new Date(booked.startTime);
				const bookedEnd = new Date(booked.endTime);
				return slotStart < bookedEnd && slotEnd > bookedStart;
			});

			if (!isBooked) {
				daySlots.push({
					startTime: slotStart.toISOString(),
					endTime: slotEnd.toISOString(),
				});
			}

			slotStart = new Date(slotStart.getTime() + sessionTime * 60000);
		}

		if (daySlots.length > 0) {
			slots[dayKey] = daySlots;
		}

		current.setDate(current.getDate() + 1);
	}

	return slots;
}

//const availability = [
//  {
//    coachId: "coach-1",
//    day: "Monday",
//    startTime: "2025-04-07T09:00:00.000Z",
//    endTime: "2025-04-07T17:00:00.000Z",
//    isAvailable: true
//  },
//  {
//    coachId: "coach-1",
//    day: "Tuesday",
//    startTime: "2025-04-08T10:00:00.000Z",
//    endTime: "2025-04-08T16:00:00.000Z",
//    isAvailable: true
//  },
//  {
//    coachId: "coach-1",
//    day: "Wednesday",
//    startTime: "2025-04-09T08:00:00.000Z",
//    endTime: "2025-04-09T12:00:00.000Z",
//    isAvailable: true
//  },
//  {
//    coachId: "coach-1",
//    day: "Thursday",
//    startTime: "2025-04-10T13:00:00.000Z",
//    endTime: "2025-04-10T18:00:00.000Z",
//    isAvailable: true
//  },
//  {
//    coachId: "coach-1",
//    day: "Friday",
//    startTime: "2025-04-11T09:00:00.000Z",
//    endTime: "2025-04-11T15:00:00.000Z",
//    isAvailable: true
//  },
//  {
//    coachId: "coach-1",
//    day: "Saturday",
//    startTime: "2025-04-12T11:00:00.000Z",
//    endTime: "2025-04-12T14:00:00.000Z",
//    isAvailable: true
//  },
//  {
//    coachId: "coach-1",
//    day: "Sunday",
//    startTime: "2025-04-13T07:00:00.000Z",
//    endTime: "2025-04-13T10:00:00.000Z",
//    isAvailable: false // not available
//  }
//];
//
	//
//const availability = [
//  {
//    _id: new ObjectId('67fa4372c023dccbf887bb94'),
//    coachId: new ObjectId('67d13a30fcd11867c068354c'),
//    day: 'Monday',
//    __v: 0,
//    createdAt: 2025-04-12T10:41:31.021Z,
//    endTime: 'Mon Apr 14 2025 16:30:00 GMT+0530 (India Standard Time)',
//    isAvailable: true,
//    startTime: 'Mon Apr 14 2025 14:30:00 GMT+0530 (India Standard Time)',
//    updatedAt: 2025-04-12T10:41:31.021Z
//  },
//  {
//    _id: new ObjectId('67fa47ccc023dccbf887bb98'),
//    coachId: new ObjectId('67d13a30fcd11867c068354c'),
//    day: 'Thursday',
//    __v: 0,
//    createdAt: 2025-04-12T11:00:05.825Z,
//    endTime: 'Wed Apr 16 2025 21:30:00 GMT+0530 (India Standard Time)',
//    isAvailable: true,
//    startTime: 'Wed Apr 16 2025 19:30:00 GMT+0530 (India Standard Time)',
//    updatedAt: 2025-04-12T11:00:05.825Z
//  },
//  {
//    _id: new ObjectId('67fa47ccc023dccbf887bb97'),
//    coachId: new ObjectId('67d13a30fcd11867c068354c'),
//    day: 'Tuesday',
//    __v: 0,
//    createdAt: 2025-04-12T11:00:05.825Z,
//    endTime: 'Mon Apr 14 2025 16:30:00 GMT+0530 (India Standard Time)',
//    isAvailable: true,
//    startTime: 'Mon Apr 14 2025 14:30:00 GMT+0530 (India Standard Time)',
//    updatedAt: 2025-04-12T11:00:05.825Z
//  },
//  {
//    _id: new ObjectId('67fa4372c023dccbf887bb95'),
//    day: 'Wednesday',
//    coachId: new ObjectId('67d13a30fcd11867c068354c'),
//    __v: 0,
//    createdAt: 2025-04-12T10:41:31.021Z,
//    endTime: 'Wed Apr 16 2025 21:30:00 GMT+0530 (India Standard Time)',
//    isAvailable: true,
//    startTime: 'Wed Apr 16 2025 19:30:00 GMT+0530 (India Standard Time)',
//    updatedAt: 2025-04-12T10:41:31.021Z
//  }
//]
//const bookedSlots = [];
//const coachInfo = {
//  sessionTime: 60,
//  timeZone: "utc"
//};
//
//const start = new Date("2025-04-07T09:00:00.000Z");
//const end = new Date("2025-04-14T09:00:00.000Z");
//
//let ans = generateTimeSlots(start, end, coachInfo, availability, bookedSlots);
//console.log(ans);
//expose({
//	generateTimeSlots,
//});
//
//console.log(JSON.stringify(generateTimeSlots(availability, '60', {})));

module.exports = { generateTimeSlots };

