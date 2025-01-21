const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createGirlSafteyServices, getGirlSafteyServices, getGirlSafteyByIdServices, updateGirlSafteyServices } = require("../Services/services.girlSaftey");
const { createGirlSafetyDto, validateGirlSafetyFields, updateGirlSafetyDto } = require("../DTOs/girlSaftey.dto");

const createGirlSafteyController = async (req, res) => {
    try {
        const girlSaftey = createGirlSafetyDto(req.body);
        const errors = validateGirlSafetyFields(girlSaftey);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createGirlSafteyServices({ ...girlSaftey, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Girl safety created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getGirlSafteyController = async (req, res) => {
    try {
        const girlSaftey = await getGirlSafteyServices();
        if (girlSaftey.length === 0) {
            sendResponse(res, null, 400, false, "Girl safety not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Girl safety fetched successfully", girlSaftey);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getGirlSafteyDetailsController = async (req, res) => {
    try {
        const girlSaftey = await getGirlSafteyByIdServices(req.params.girlSafteyId);
        if (!girlSaftey) {
            sendResponse(res, null, 400, false, "Girl safety not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Girl safety fetched successfully", girlSaftey);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateGirlSafteyController = async (req, res) => {
    try {
        const girlSaftey = await getGirlSafteyByIdServices(req.params.girlSafteyId);
        if (!girlSaftey) {
            sendResponse(res, null, 400, false, "Girl safety not found");
            return
        } else {
            const girlSafteyBody = updateGirlSafteyDto(req.body, girlSaftey);
            await updateGirlSafteyServices(girlSaftey._id, girlSafteyBody);
            sendResponse(res, null, 200, true, "Girl safety updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createGirlSafteyController,
    getGirlSafteyController,
    getGirlSafteyDetailsController,
    updateGirlSafteyController
};