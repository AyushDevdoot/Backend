const CorporateHealthModel = require("../Models/models.corporateHealth");

const createCorporateHealthServices = async (corporateHealth) => {
    const finalBody = new CorporateHealthModel(corporateHealth);
    return await finalBody.save();
};

const getCorporateHealthServices = async () => {
    return await CorporateHealthModel.find();
};

const getCorporateHealthByIdServices = async (corporateHealthId) => {
    return await CorporateHealthModel.findOne({ _id: corporateHealthId });
};

const updateCorporateHealthServices = async (corporateHealthId, corporateHealthBody) => {
    return await CorporateHealthModel.findByIdAndUpdate(corporateHealthId, corporateHealthBody);
};

module.exports = {
    createCorporateHealthServices,
    getCorporateHealthServices,
    getCorporateHealthByIdServices,
    updateCorporateHealthServices
};