const { createDietCounsellingDto, validateDietCounsellingFields } = require("../DTOs/dietCounselling.dto");
const { createCounsellingServices } = require("../Services/services.dietCouselling");

const { sendResponse } = require("../Helpers/helpers.commonFunc");
const createDietCounsellingController = async (req, res) => {
    try {
        const dietCounselling = createDietCounsellingDto(req.body);
        const errors = validateDietCounsellingFields(dietCounselling);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createCounsellingServices({ ...dietCounselling, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Diet councelling created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getDietCounsellingController = async (req, res) => {
    try {
        const dietCounselling = await getDietCounsellingServices();
        if (dietCounselling.length === 0) {
            sendResponse(res, null, 400, false, "Diet councelling not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Diet councelling fetched successfully", dietCounselling);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createDietCounsellingController,
    getDietCounsellingController
};