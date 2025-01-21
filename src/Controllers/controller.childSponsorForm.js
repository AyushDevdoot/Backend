const { createChildSponsorFormDto, validateChildSponsorForm } = require("../DTOs/childSponsorForm.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createSponsorFormServices } = require("../Services/servcies.childSponsorForm");

const createSponsorFormController = async (req, res) => {
    try {
        const childSponsorForm = createChildSponsorFormDto(req.body);
        const errors = validateChildSponsorForm(childSponsorForm);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createSponsorFormServices({ ...childSponsorForm, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Child sponsor form created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

// const getSponsorFormController = async (req, res) => {
//     try {
//         const childSponsorForm = await getSponsorFormServices();
//         if (childSponsorForm.length === 0) {
//             sendResponse(res, null, 400, false, "Child sponsor form not found");
//             return
//         } else {
//             sendResponse(res, null, 200, true, "Child sponsor form fetched successfully", childSponsorForm);
//             return
//         }
//     } catch (err) {
//         sendResponse(res, err);
//         return
//     }
// };

module.exports = {
    createSponsorFormController,
    // getSponsorFormController
};