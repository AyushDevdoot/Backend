const mongoose = require('mongoose');

const coachSlotSchema = new mongoose.Schema({
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    
    days:[
        {
            day:{type:String, required:true},
            slots:[
                {
                    startTime:{type:String, required:true},
                    endTime:{type:String, required:true}
                }
            ]
        }
    ]




})

module.exports = mongoose.model('coachSlot',coachSlotSchema);