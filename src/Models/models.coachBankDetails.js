const mongoose = require('mongoose');

const coachBankDetailsSchema = new mongoose.Schema({
    coachId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"coachinfo",
        required:true,
        unique:true
    },
    bankName:{
        type: String,
        required: true
    },
    bankIFSC:{
        type:String,
        required:true
    },
    bankSwiftCode:{
        type:String,
        required:false
    },
    bankAccountNumber:{
        type:Number,
        required:true
    },
    upiId:{
        type:String,
        required:true
    }

})

const coachBankDetailsModel = mongoose.model('coachbankdetailsmodel',coachBankDetailsSchema)

module.exports = coachBankDetailsModel