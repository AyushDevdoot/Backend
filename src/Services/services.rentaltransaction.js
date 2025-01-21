const RentalTransactionModel = require("../Models/models.rentalTransaction")

const createRentalTransactionServices = async (body) => {
    const finalBody = new RentalTransactionModel(body)
    return await finalBody.save()
}

const getRentalTransactionByIdServices = async (rentalTransactionId) => {
    return await RentalTransactionModel.findOne({ _id: rentalTransactionId }).select("-__v")
}
module.exports = {
    createRentalTransactionServices,
    getRentalTransactionByIdServices
}