const { createPackageDto, validatePackageFields } = require("../DTOs/corporate.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createCorporatePackageServices, getCorporatePackagesServices } = require("../Services/services.corporatePackage");

const createCorporatePackageController = async (req, res) => {
    try {
        const createPackageBody = createPackageDto(req.body);
        const errors = validatePackageFields(createPackageBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createCorporatePackageServices({ ...createPackageBody, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Corporate package created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getCorporatePackageController = async (req, res) => {
    try {
        const corporatePackage = await getCorporatePackagesServices();
        if (corporatePackage.length === 0) {
            sendResponse(res, null, 400, false, "Corporate package not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Corporate package fetched successfully", corporatePackage);
            return
        }
    } catch (err) {
        sendResponse(res, err);
    }
};

module.exports = {
    createCorporatePackageController,
    getCorporatePackageController
};