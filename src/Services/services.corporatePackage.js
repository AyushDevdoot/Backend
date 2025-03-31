const CorporatePackageModel = require("../Models/models.corporatePackage");

const createCorporatePackageServices = async (corporatePackage) => {
    const finalBody = new CorporatePackageModel(corporatePackage);
    return await finalBody.save();
}

const getCorporatePackagesServices = async () => {
    return await CorporatePackageModel.find({ isActive: true });
}

module.exports = {
    createCorporatePackageServices,
    getCorporatePackagesServices
}