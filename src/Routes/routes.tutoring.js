const { createTutoringCareGiverFinderController } = require('../Controllers/controller.tutoring');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const tutoringRouter = require('express').Router();

tutoringRouter.post('/', verifyUserMiddleware, createTutoringCareGiverFinderController);

module.exports = tutoringRouter;