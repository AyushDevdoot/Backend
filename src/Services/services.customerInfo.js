const CustomerInfoModel = require("../Models/models.customerInfo")

const createCustomerServices = async (body) => {
    const finalBody = new CustomerInfoModel(body)
    return await finalBody.save()
}

const getCustomerByIdServices = async (customerId) => {
    return await CustomerInfoModel.findOne({ _id: customerId }).select("-__v")
}

module.exports = {
    createCustomerServices,
    getCustomerByIdServices
}