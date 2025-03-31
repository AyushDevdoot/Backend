const { createRentalTransactionController, getRentalTransactionByIdController } = require('../Controllers/controller.rentalTransaction');

const rentalTransactionRouter = require('express').Router();

rentalTransactionRouter.post('/', createRentalTransactionController);
rentalTransactionRouter.get('/:rentalTransactionId', getRentalTransactionByIdController);

module.exports = rentalTransactionRouter;