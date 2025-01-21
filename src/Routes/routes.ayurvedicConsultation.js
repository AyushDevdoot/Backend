const { createAyurvedaConsultationFormController } = require('../Controllers/controller.ayurvedaConsultationForm');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const ayurvedaConsultationFormRouter = require('express').Router();

ayurvedaConsultationFormRouter.post('/', verifyUserMiddleware, createAyurvedaConsultationFormController);

module.exports = ayurvedaConsultationFormRouter;