const { createMentalHealthFormController } = require('../Controllers/controller.mentalHealth');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const mentalHealthFormRouter = require('express').Router();

mentalHealthFormRouter.post('/', verifyUserMiddleware, createMentalHealthFormController);

module.exports = mentalHealthFormRouter;