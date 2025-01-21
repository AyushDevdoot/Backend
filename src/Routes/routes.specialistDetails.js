const { createSpecialistDetailsController, getSpecialistDetailsController } = require('../Controllers/controller.specialistDetails');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const specialistDetailsRouter = require('express').Router();

specialistDetailsRouter.post('/', verifyUserMiddleware, createSpecialistDetailsController);
specialistDetailsRouter.get('/', verifyUserMiddleware, getSpecialistDetailsController);

module.exports = specialistDetailsRouter;