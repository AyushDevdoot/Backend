const {createCoachBankDetailsServices, getCoachBankDetailsByIdService}= require('../Services/services.coachBankDetails');
const { sendResponse } = require("../Helpers/helpers.commonFunc");

const createCoachBankDetailsController = async (req, res) => {
    try {
        const coachBankDetails = req.body;
        console.log("Received request body:", coachBankDetails);
        console.log(req.user._id)
        const coachId = req.user._id

        await createCoachBankDetailsServices({...coachBankDetails,coachId});
        sendResponse(res, null, 200, 'Coach Bank Details Created Successfully');
    } catch (error) {
        console.error("Error in createCoachBankDetailsController:", error);
        sendResponse(res, null, 500, 'Internal Server Error');
    }
};

const getCoachBankDetailsController= async(req,res) =>{
    const user = await getCoachBankDetailsByIdService(req.user._id);
    if (!user) {
        sendResponse(res, null, 400, false, "user not found");
        return
    } else {
        sendResponse(res, null, 200, true, "user details fetched successfully", getUserDto(user));
        return
    }

}

module.exports ={ createCoachBankDetailsController ,getCoachBankDetailsController}; 