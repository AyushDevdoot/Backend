const MentalHealthFormModel = require("../Models/models.mentalHealthForm");

const createMentalHealthFormServices = async (mentalHealthForm) => {
    const finalBody = new MentalHealthFormModel(mentalHealthForm);
    return await finalBody.save();
}

module.exports = {
    createMentalHealthFormServices
}