const { createPetCareFormController } = require('../Controllers/controller.petCareForm');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const petCareFormRouter = require('express').Router();

petCareFormRouter.post('/', verifyUserMiddleware, createPetCareFormController);

module.exports = petCareFormRouter;