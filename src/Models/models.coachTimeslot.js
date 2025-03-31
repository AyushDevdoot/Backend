const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    startTime: {type:String, required: true},
    endTime:  {type:String, required: true}

})

const coachSlotSchema = new mongoose.Schema({
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"coachinfo",
        required:true,
    },
    
    slots:{
        type:Map,
        of:[slotSchema],
        required:true,
    },

});

module.exports = mongoose.model('coachSlot',coachSlotSchema);