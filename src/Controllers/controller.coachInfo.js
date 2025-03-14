const { createCoachDto, validateCreateCoachDto, getCoachesListDto } = require("../DTOs/coachInfo.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createCoachInfoServices, getCoachInfoServices,updateCoachInfoServices ,getCoachProfileServices, deleteCoachProfileServices} = require("../Services/services.coachInfo");

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
        const coachId = req.user._id;
        if (!coachId) {
            return sendResponse(res, null, 400, false, "Coach ID not found");
        }
        const updateData = updateCoachInfoDto(req.body);
        
        if (Object.keys(updateData).length === 0) {
            return sendResponse(res, null, 400, false, "No valid update fields provided");
        }
        
        const validationErrors = validateUpdateCoachDto(updateData);
        
        if (Object.keys(validationErrors).length > 0) {
            return sendResponse(res, null, 400, false, validationErrors);
        }
        console.log("Updating coach with ID:", coachId);
        console.log("Update data:", updateData);
        
        const updatedCoach = await updateCoachInfoServices(coachId, updateData);
        
        if (!updatedCoach) {
            return sendResponse(res, null, 404, false, "Coach not found or update failed");
        }
        
        return sendResponse(res, null, 200, true, "Coach info updated successfully");
    } catch (err) {
        console.log("Update coach error:", err);
        return sendResponse(res, err, 500, false, "Internal server error during update");
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

const deleteCoachInfoController = async (req, res) => {
    const coachProfile = await deleteCoachProfileServices(req.user._id)
    console.log(coachProfile)
    if (!coachProfile) {
        return sendResponse(res, null, 404, false, "Coach profile not found");
    }
    sendResponse(res, null, 200, true, "Coach profile deleted successfully",'Deletion Successful');
        return
    

}

module.exports = {
    createCoachInfoController,
    getCoachInfoController,
    updateCoachInfoController,
    getProfileController,
    deleteCoachInfoController
};