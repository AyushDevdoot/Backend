const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const { createExchangeRateServices, getExchangeRateServices, getExchangeRateByCurrencyServices } = require("../../Services/services.exchangeRate");

const createCoachInfoController = async (req, res) => {
    try {
        //specialization id should be object id 
        const coachInfo = createCoachDto(req.body);
        const errors = validateCreateCoachDto(coachInfo);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }

        await createCoachInfoServices(coachInfo);
        sendResponse(res, null, 201, true, "Coach info created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getExchangeRateByCurrencyController = async (req, res) => {
    try {
        const query = req.params.currency;

        const coachInfo = await getCoachInfoByIdServices(query);
        console.log(coachInfo)
        sendResponse(res, null, 200, true, "Coach info fetched successfully", coachInfo);
        return
    } catch (err) {
        console.log(err)
        sendResponse(res, err);
        return
    }

};

const updateCoachInfoController = async (req, res) => {
    try {
        const coachInfo = await getCoachInfoByIdServices(req.params.coachId);
        if (!coachInfo) {
            sendResponse(res, null, 400, false, "Coach info not found");
            return
        } else {
            const coachInfoBody = updateCoachInfoDto(req.body, coachInfo);
            await updateCoachInfoServices(coachInfo._id, coachInfoBody);
            sendResponse(res, null, 200, true, "Coach info updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createCoachInfoController,
    getCoachInfoController,
    getCoachInfoByIdController,
    updateCoachInfoController
};
