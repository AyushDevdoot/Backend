const { createChildSponsorDto, validateChildSponsorFields, getChildSponsorDto } = require("../DTOs/childSponsor.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createChildSponsorService, getChildSponsorService, getChildSponsorByIdService } = require("../Services/services.childSponsor");

const createChildSponsorDataController = async (req, res) => {
    try {
        const childSponsor = createChildSponsorDto(req.body);
        const errors = validateChildSponsorFields(childSponsor);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createChildSponsorService({ ...childSponsor, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Child sponsor data created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getChildSponsorDataController = async (req, res) => {
    try {
        const childSponsorData = await getChildSponsorService();
        if (childSponsorData.length === 0) {
            sendResponse(res, null, 400, false, "Child sponsor data not found");
            return
        } else {
            const formatterData = childSponsorData.map((data) => {
                return getChildSponsorDto(data)
            })
            sendResponse(res, null, 200, true, "Child sponsor data fetched successfully", formatterData);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getChildSponsorDetailsController = async (req, res) => {
    try {
        const childSponsorData = await getChildSponsorByIdService(req.params.id);
        if (!childSponsorData) {
            sendResponse(res, null, 400, false, "Child sponsor data not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Child sponsor data fetched successfully", getChildSponsorDto(childSponsorData));
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createChildSponsorDataController,
    getChildSponsorDataController,
    getChildSponsorDetailsController
};