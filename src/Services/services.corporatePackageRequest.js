const CorporatePackageRequestModel = require("../Models/models.corporatePackageRequest");

const createCorporatePackageRequestServices = async (corporatePackageRequest) => {
    const finalBody = new CorporatePackageRequestModel(corporatePackageRequest);
    return await finalBody.save();
}

module.exports = {
    createCorporatePackageRequestServices
}