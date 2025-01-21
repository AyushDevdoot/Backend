const ChildSponsorDataModel = require("../Models/models.childSponsorData");

const createChildSponsorService = async (childSponsor) => {
    const finalBody = new ChildSponsorDataModel(childSponsor);
    return await finalBody.save();
}
const getChildSponsorService = async () => {
    return await ChildSponsorDataModel.find({});
}

const getChildSponsorByIdService = async (childSponsorId) => {
    return await ChildSponsorDataModel.findOne({ _id: childSponsorId });
}

module.exports = {
    createChildSponsorService,
    getChildSponsorService,
    getChildSponsorByIdService
}