const { createSeniorCareGiverFinderController } = require('../Controllers/controller.seniorCareGiverFinder');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const seniorCareGiverFinderRouter = require('express').Router();

seniorCareGiverFinderRouter.post('/', verifyUserMiddleware, createSeniorCareGiverFinderController);

module.exports = seniorCareGiverFinderRouter;