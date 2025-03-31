const homeHealthCheckupReqModel = require("../Models/models.homeHealthCheckupReq");

const createHomeHealthPackageReqServices = async (homeHealthCheckupReq) => {
    const finalBody = new homeHealthCheckupReqModel(homeHealthCheckupReq);
    return await finalBody.save();
}


module.exports = {
    createHomeHealthPackageReqServices
}