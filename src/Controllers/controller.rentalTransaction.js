const { createRentalTransactionDto, validateRentalTransactionFields } = require("../DTOs/rentaltransaction.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createRentalTransactionServices, getRentalTransactionByIdServices } = require("../Services/services.rentaltransaction");

const createRentalTransactionController = async (req, res) => {
    try {
        const transactionBody = createRentalTransactionDto(req.body);
        const errors = validateRentalTransactionFields(transactionBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createRentalTransactionServices({ ...transactionBody, rentalStatus: "ongoing" });
        sendResponse(res, null, 201, true, "Rental transaction created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
    }
}

const getRentalTransactionByIdController = async (req, res) => {
    try {
        const transaction = await getRentalTransactionByIdServices(req.params.rentalTransactionId);
        if (!transaction) {
            sendResponse(res, null, 400, false, "rental transaction not found");
            return
        } else {
            sendResponse(res, null, 200, true, "rental transaction fetched successfully", transaction);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};
module.exports = {
    createRentalTransactionController,
    getRentalTransactionByIdController
}