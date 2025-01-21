const { createSpecialistFormDto, validateSpecialistForm } = require("../DTOs/specialistForm.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createSpecialistFormServices } = require("../Services/services.specialistForm");

const createSpecialistFormController = async (req, res) => {
    try {
        const specialistForm = createSpecialistFormDto(req.body);
        const errors = validateSpecialistForm(specialistForm);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createSpecialistFormServices({ ...specialistForm, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Specialist form created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

// const getSpecialistFormController = async (req, res) => {
//     try {
//         const specialistForm = await getSpecialistFormServices();
//         if (specialistForm.length === 0) {
//             sendResponse(res, null, 400, false, "Specialist form not found");
//             return
//         } else {
//             sendResponse(res, null, 200, true, "Specialist form fetched successfully", specialistForm);
//             return
//         }
//     } catch (err) {
//         sendResponse(res, err);
//         return
//     }
// };

module.exports = {
    createSpecialistFormController
}