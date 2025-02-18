const { createCoachDto, validateCreateCoachDto, getCoachesListDto } = require("../DTOs/coachInfo.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createCoachInfoServices, getCoachInfoServices,updateCoachInfoServices ,getCoachProfileServices} = require("../Services/services.coachInfo");

const createCoachInfoController = async (req, res) => {
    try {
        const coachInfo = createCoachDto(req.body);
        const errors = validateCreateCoachDto(coachInfo);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createCoachInfoServices({ ...coachInfo, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Coach info created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getCoachInfoController = async (req, res) => {
    try {
        let query = {}
        if (req.query?.type !== "all") {
            query.specialization = req.query.type?.toString().toLowerCase();
        }
        const coachInfo = await getCoachInfoServices(query);
        if (coachInfo.length === 0) {
            sendResponse(res, null, 200, false, "Coach info not found");
            return
        } else {
            const coachListFormattedData = coachInfo.map(coach => {
                return getCoachesListDto(coach)
            });
            sendResponse(res, null, 200, true, "Coach info fetched successfully", coachListFormattedData);
            return
        }
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const updateCoachInfoController = async (req, res) => {
    try {
        const coachInfo = req.user._id
        if (!coachInfo) {
            sendResponse(res, null, 400, false, "Coach info not found");
            return
        } else {
            // const coachInfoBody = updateCoachInfoDto(req.body, coachInfo);
            await updateCoachInfoServices(coachInfo,req.body);
            sendResponse(res, null, 200, true, "Coach info updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getProfileController = async(req,res) => {
    try {
        const coachProfile = await getCoachProfileServices(req.user._id)
        console.log(coachProfile)
        if (!coachProfile) {
            return sendResponse(res, null, 404, false, "Coach profile not found");
        }

        sendResponse(res, null, 200, true, "Coach profile fetched successfully",coachProfile);
        return
    } catch (error) {
        sendResponse(res, error, 500, false, "Error fetching coach profile");
    }
}

module.exports = {
    createCoachInfoController,
    getCoachInfoController,
    updateCoachInfoController,
    getProfileController
};