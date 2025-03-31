const ImmunicareModel = require("../Models/models.immunicare");

const createImmunicareServices = async (immunicare) => {
    const finalBody = new ImmunicareModel(immunicare);
    return await finalBody.save();
}

const getImmunicareServices = async () => {
    return await ImmunicareModel.find({});
}

module.exports = {
    createImmunicareServices,
    getImmunicareServices
}