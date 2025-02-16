const {createCoachBankDetailsServices}= require('../Services/services.coachBankDetails');
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const createCoachBankDetailsController = async (req,res) =>{
    const coachBankDetails=req.body;
    await createCoachBankDetailsServices({...coachBankDetails,createdBy:req._id});
    sendResponse(res,null,200,'Coach Bank Details Created Successfully')
}

module.exports = {createCoachBankDetailsController}