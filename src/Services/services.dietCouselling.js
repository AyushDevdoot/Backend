const DietCounsellingModel = require("../Models/models.dietCounselling");

const createCounsellingServices = async (counselling) => {
    const finalBody = new DietCounsellingModel(counselling);
    return await finalBody.save();
}

module.exports = {
    createCounsellingServices
}   