const {createCoachBankDetailsServices}= require('../Services/services.coachBankDetails');
const { sendResponse } = require("../Helpers/helpers.commonFunc");

const createCoachBankDetailsController = async (req, res) => {
    try {
        const coachBankDetails = req.body;
        console.log("Received request body:", coachBankDetails);

        await createCoachBankDetailsServices({...coachBankDetails, createdBy: req._id});
        sendResponse(res, null, 200, 'Coach Bank Details Created Successfully');
    } catch (error) {
        console.error("Error in createCoachBankDetailsController:", error);
        sendResponse(res, null, 500, 'Internal Server Error');
    }
};

module.exports ={ createCoachBankDetailsController }; 