const { createPetCareGiverController } = require('../Controllers/controller.petCareGiverFinder');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const petCareGiverFinderRouter = require('express').Router();

petCareGiverFinderRouter.post('/', verifyUserMiddleware, createPetCareGiverController);

module.exports = petCareGiverFinderRouter;