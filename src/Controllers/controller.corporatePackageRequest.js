const { createCorporatePackageRequestDto, validateCorporatePackageRequestFields } = require("../DTOs/corporatePackageRequest.dto");
const { createCorporatePackageRequestServices } = require("../Services/services.corporatePackageRequest");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const createCorporatePackageRequestController = async (req, res) => {
    try {
        const corporatePackage = createCorporatePackageRequestDto(req.body);
        const errors = validateCorporatePackageRequestFields(corporatePackage);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createCorporatePackageRequestServices({ ...corporatePackage, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Corporate package request created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createCorporatePackageRequestController
};