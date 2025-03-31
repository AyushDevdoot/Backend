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
        required:false
    },
    bankSwiftCode:{
        type:String,
        required:false
    },
    bankAccountNumber:{
        type:Number,
        required:false
    },
    upiId:{
        type:String,
        required:false
    },
    routingNumber:{
        type:Number,
        required:false
    }

})

const coachBankDetailsModel = mongoose.model('coachbankdetailsmodel',coachBankDetailsSchema)

module.exports = coachBankDetailsModel