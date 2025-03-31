const { createCustomerController, getCustomerByIdController } = require('../Controllers/controller.customerInfo');

const customerInfoRouter = require('express').Router();

customerInfoRouter.post('/', createCustomerController);
customerInfoRouter.get('/:customerId', getCustomerByIdController);

module.exports = customerInfoRouter;