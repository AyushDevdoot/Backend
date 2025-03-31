const HealthCheckupPackageModel = require("../Models/models.healthCheckupPackage");

const createHealthCheckupPackageServices = async (healthCheckupPackage) => {
    const finalBody = new HealthCheckupPackageModel(healthCheckupPackage);
    return await finalBody.save();
};

const getHealthCheckupPackageServices = async () => {
    return await HealthCheckupPackageModel.find();
};

const getHealthCheckupPackageByIdServices = async (healthCheckupPackageId) => {
    return await HealthCheckupPackageModel.findOne({ _id: healthCheckupPackageId });
};

const updateHealthCheckupPackageServices = async (healthCheckupPackageId, healthCheckupPackageBody) => {
    return await HealthCheckupPackageModel.findByIdAndUpdate(healthCheckupPackageId, healthCheckupPackageBody);
};

module.exports = {
    createHealthCheckupPackageServices,
    getHealthCheckupPackageServices,
    getHealthCheckupPackageByIdServices,
    updateHealthCheckupPackageServices
};