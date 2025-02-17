const {createCoachBankDetailsServices, getCoachBankDetailsByIdService, updateCoachBankDetailsServices}= require('../Services/services.coachBankDetails');
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createUserDto, validateCreateUserDto, getUserDto } = require("../DTOs/user.dto");

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
    console.log(user,"hi")
    if (!user) {
        sendResponse(res, null, 400, false, "user not found");
        return
    } else {
        sendResponse(res, null, 200, true, "user details fetched successfully",user);
        return 
    }


}

const updateCoachBankDetailsController = async (req, res) => {
    try {
        const coachId = req.user._id;
        const updatedCoachBankDetails = req.body;

        console.log("Updating coach bank details for:", coachId);
        console.log("New details:", updatedCoachBankDetails);

        // Call service to update details
        const updatedRecord = await updateCoachBankDetailsServices(coachId, updatedCoachBankDetails);

        if (!updatedRecord) {
            return sendResponse(res, null, 404, false, "Bank details not found or update failed");
        }

        sendResponse(res, updatedRecord, 200, true, "Bank details updated successfully");
    } catch (error) {
        console.error("Error in updateCoachBankDetailsController:", error);
        sendResponse(res, null, 500, false, "Internal Server Error");
    }
};


module.exports ={ createCoachBankDetailsController ,getCoachBankDetailsController, updateCoachBankDetailsController};