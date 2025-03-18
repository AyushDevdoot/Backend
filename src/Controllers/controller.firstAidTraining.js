const { createFirstAidTrainingDto, validateFirstAidTrainingFields } = require("../DTOs/firstAid.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createFirstAidTrainingServices, getFirstAidTrainingServices } = require("../Services/services.firstAidTraining");

const createFirstAidTrainingController = async (req, res) => {
    try {
        const firstAidTraining = createFirstAidTrainingDto(req.body);
        const errors = validateFirstAidTrainingFields(firstAidTraining);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createFirstAidTrainingServices({ ...firstAidTraining, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "First aid training created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getFirstAidTrainingController = async (req, res) => {
    try {
        const firstAidTraining = await getFirstAidTrainingServices();
        if (firstAidTraining.length === 0) {
            sendResponse(res, null, 400, false, "First aid training not found");
            return
        } else {
            sendResponse(res, null, 200, true, "First aid training fetched successfully", firstAidTraining);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createFirstAidTrainingController,
    getFirstAidTrainingController
};