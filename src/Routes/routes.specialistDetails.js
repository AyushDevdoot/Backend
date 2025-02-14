const { createSpecialistDetailsController, getSpecialistDetailsController } = require('../Controllers/controller.specialistDetails');
const { createSpecializations, allSpecialization, searchSpecializationsById, searchSpecializationBy_id } = require('../Controllers/specialization/controller.specialization');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const specialistDetailsRouter = require('express').Router();

specialistDetailsRouter.post('/', verifyUserMiddleware, createSpecialistDetailsController);
specialistDetailsRouter.get('/', verifyUserMiddleware, getSpecialistDetailsController);

specialistDetailsRouter.get('/create', createSpecializations);
specialistDetailsRouter.get('/search-all', allSpecialization);
specialistDetailsRouter.get('/search-by-id', searchSpecializationsById);

module.exports = specialistDetailsRouter;
