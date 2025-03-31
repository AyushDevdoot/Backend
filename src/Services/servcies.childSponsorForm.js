const ChildSponsorFormModel = require("../Models/models.childSponsorForm");

const createSponsorFormServices = async (childSponsorForm) => {
    const finalBody = new ChildSponsorFormModel(childSponsorForm);
    return await finalBody.save();
}

module.exports = {
    createSponsorFormServices
}