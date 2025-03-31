const homeHealthCheckupModel = require("../Models/models.homeHealthCheckup");

const createHomeHealthCheckupServices = async (homeHealthCheckup) => {
    const finalBody = new homeHealthCheckupModel(homeHealthCheckup);
    return await finalBody.save();
}

const getHomeHealthCheckupServices = async () => {
    return await homeHealthCheckupModel.find({ isActive: true });
}

module.exports = {
    createHomeHealthCheckupServices,
    getHomeHealthCheckupServices
}