const { createMedicalEquipmentFormController, getMedicalEquipmentFormController } = require('../Controllers/controller.medicalEquipmentForm');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const medicalEquipmentFormRouter = require('express').Router();

medicalEquipmentFormRouter.post('/', verifyUserMiddleware, createMedicalEquipmentFormController);
medicalEquipmentFormRouter.get('/', getMedicalEquipmentFormController);

module.exports = medicalEquipmentFormRouter;