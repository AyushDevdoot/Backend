const { generateTimeSlots } = require('../src/Helpers/helpers.generateSlots');

test('GenerateSlots from 0 to 100', () => {
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

	const bookedSlots = [
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-08T09:00:00.000Z",
			"endTime": "2025-04-08T10:00:00.000Z",
			"status": "confirmed",
			"auditHistory": [],
			"description": "Initial coaching session.",
			"paymentStatus": true,
			"updatedBy": "user"
		},
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-09T11:00:00.000Z",
			"endTime": "2025-04-09T12:00:00.000Z",
			"status": "rescheduled",
			"auditHistory": [
				{
					"status": "rescheduled",
					"StartTime": "2025-04-09T10:00:00.000Z",
					"endTime": "2025-04-09T11:00:00.000Z",
					"paymentStatus": false,
					"updatedAt": "2025-04-08T18:00:00.000Z",
					"updatedBy": "user"
				}
			],
			"description": "Session moved by user.",
			"paymentStatus": false,
			"updatedBy": "user"
		},
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-10T14:00:00.000Z",
			"endTime": "2025-04-10T15:00:00.000Z",
			"status": "pending",
			"auditHistory": [],
			"description": "Waiting for coach confirmation.",
			"paymentStatus": false,
			"updatedBy": "user"
		},
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-11T16:00:00.000Z",
			"endTime": "2025-04-11T17:00:00.000Z",
			"status": "canceled",
			"auditHistory": [
				{
					"status": "pending",
					"StartTime": "2025-04-11T16:00:00.000Z",
					"endTime": "2025-04-11T17:00:00.000Z",
					"paymentStatus": false,
					"updatedAt": "2025-04-10T12:00:00.000Z",
					"updatedBy": "user"
				}
			],
			"description": "User canceled due to personal reasons.",
			"paymentStatus": false,
			"updatedBy": "user"
		},
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-12T10:00:00.000Z",
			"endTime": "2025-04-12T11:00:00.000Z",
			"status": "completed",
			"auditHistory": [],
			"description": "Successful session on confidence building.",
			"paymentStatus": true,
			"updatedBy": "coach"
		},
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-13T13:30:00.000Z",
			"endTime": "2025-04-13T14:30:00.000Z",
			"status": "confirmed",
			"auditHistory": [],
			"description": "Follow-up session on mindset.",
			"paymentStatus": true,
			"updatedBy": "coach"
		},
		{
			"userId": "66167ab3e28b1a7e9cd77def",
			"coachId": "661670f2e28b1a7e9cd77abc",
			"startTime": "2025-04-14T08:00:00.000Z",
			"endTime": "2025-04-14T09:00:00.000Z",
			"status": "reschedule-request",
			"auditHistory": [
				{
					"status": "pending",
					"StartTime": "2025-04-14T08:00:00.000Z",
					"endTime": "2025-04-14T09:00:00.000Z",
					"paymentStatus": false,
					"updatedAt": "2025-04-13T20:00:00.000Z",
					"updatedBy": "user"
				}
			],
			"description": "Request to reschedule due to timing conflict.",
			"paymentStatus": false,
			"updatedBy": "user"
		}
	]


//	let ans = generateTimeSlots( "2025-04-07T09:00:00.000Z", "2025-04-14T09:00:00.000Z",{"sessionTime": 60, timeZone: "Asia/kolkata"},availability, bookedSlots)
//
//	expect(ans).toEqual({"coachId":"661670f2e28b1a7e9cd77abc","slots":{"Monday":[{"startTime":"9:00 AM","endTime":"10:00 AM"},{"startTime":"10:00 AM","endTime":"11:00 AM"},{"startTime":"11:00 AM","endTime":"11:00 AM"}],"Tuesday":[{"startTime":"9:00 AM","endTime":"10:00 AM"},{"startTime":"10:00 AM","endTime":"11:00 AM"},{"startTime":"11:00 AM","endTime":"11:00 AM"}],"Wednesday":[{"startTime":"2:00 PM","endTime":"3:00 PM"},{"startTime":"3:00 PM","endTime":"4:00 PM"},{"startTime":"4:00 PM","endTime":"4:00 PM"}],"Thursday":[{"startTime":"1:00 PM","endTime":"2:00 PM"},{"startTime":"2:00 PM","endTime":"3:00 PM"},{"startTime":"3:00 PM","endTime":"3:00 PM"}],"Friday":[{"startTime":"10:30 AM","endTime":"11:30 AM"},{"startTime":"11:30 AM","endTime":"12:00 PM"}],"Saturday":[{"startTime":"8:00 AM","endTime":"9:00 AM"},{"startTime":"9:00 AM","endTime":"10:00 AM"},{"startTime":"10:00 AM","endTime":"10:00 AM"}]}}
);

});

