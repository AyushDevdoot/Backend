const { createCustomerDto, validateCustomerFields } = require("../DTOs/customer.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { getCustomerByIdServices, createCustomerServices } = require("../Services/services.customerinfo");

const createCustomerController = async (req, res) => {
    try {
        const customerBody = createCustomerDto(req.body);
        const errors = validateCustomerFields(customerBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createCustomerServices(customerBody);
        sendResponse(res, null, 201, true, "Customer created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getCustomerByIdController = async (req, res) => {
    try {
        const customer = await getCustomerByIdServices(req.params.customerId);
        if (!customer) {
            sendResponse(res, null, 400, false, "Customer not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Customer fetched successfully", customer);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createCustomerController,
    getCustomerByIdController
};