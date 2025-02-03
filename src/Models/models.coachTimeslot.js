const mongoose = require('mongoose');

const slotSchema = new Mongoose.Schema({
    startTime: {type:String, required: True},
    endTime:  {type:String, required: True}

})

const coachSlotSchema = new mongoose.Schema({
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Coach",
        required:true,
    },
    
    slots:{
        type:Map,
        of:[slotSchema],
        required:True,
    },

});

module.exports = mongoose.model('coachSlot',coachSlotSchema);