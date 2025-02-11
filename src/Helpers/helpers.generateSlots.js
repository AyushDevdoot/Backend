const generateTimeSlots = (data, x) => {
    const weekSlots = {};
  
    data.days.forEach(day => {
      const daySlots = [];
      
      day.slots.forEach(slot => {
        let [startHour, startMinute] = convertTo24Hour(slot.startTime);
        const [endHour, endMinute] = convertTo24Hour(slot.endTime);
  
        let totalStartMinutes = startHour * 60 + parseInt(startMinute);
        let totalEndMinutes = endHour * 60 + parseInt(endMinute);
  
        while (totalStartMinutes + x <= totalEndMinutes) {
          let slotStartHour = Math.floor(totalStartMinutes / 60);
          let slotStartMinute = totalStartMinutes % 60;
          let slotEndMinutes = totalStartMinutes + x;
          let slotEndHour = Math.floor(slotEndMinutes / 60);
          let slotEndMinute = slotEndMinutes % 60;
  
          daySlots.push({
            startTime: formatTime(slotStartHour, slotStartMinute),
            endTime: formatTime(slotEndHour, slotEndMinute)
          });
  
          totalStartMinutes += x;
        }
      });
  
      weekSlots[day.day] = daySlots;
    });
  
    return {coachId:data.coachId,slots:weekSlots};

  }
  
  const convertTo24Hour = (time) => {
    const [hour, minutePart] = time.split(':');
    const minutes = minutePart.split(' ')[0];
    const period = minutePart.split(' ')[1];
  
    let hourIn24 = parseInt(hour);
    if (period === 'PM' && hourIn24 < 12) hourIn24 += 12;
    if (period === 'AM' && hourIn24 === 12) hourIn24 = 0;
  
    return [hourIn24, minutes];
  }
  
  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${period}`;
  }
  
  
module.exports=generateTimeSlots;
  