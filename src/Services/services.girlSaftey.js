const GirlSafteyModel = require("../Models/models.girlSaftey");

const createGirlSafteyServices = async (girlSaftey) => {
    const finalBody = new GirlSafteyModel(girlSaftey);
    return await finalBody.save();
};

const getGirlSafteyServices = async () => {
    return await GirlSafteyModel.find();
};

const getGirlSafteyByIdServices = async (girlSafteyId) => {
    return await GirlSafteyModel.findOne({ _id: girlSafteyId });
};

const updateGirlSafteyServices = async (girlSafteyId, girlSafteyBody) => {
    return await GirlSafteyModel.findByIdAndUpdate(girlSafteyId, girlSafteyBody);
};

module.exports = {
    createGirlSafteyServices,
    getGirlSafteyServices,
    getGirlSafteyByIdServices,
    updateGirlSafteyServices
};