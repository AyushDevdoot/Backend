const { createMedicalEquipmentController, getMedicalEquipmentByIdController, getMedicalEquipmentBySRController, updateMedicalEquipmentController } = require('../Controllers/controller.medicalEquipmentInfo');

const medicalEquipmentRouter = require('express').Router();

medicalEquipmentRouter.post('/', createMedicalEquipmentController);
medicalEquipmentRouter.get('/id/:equipmentId', getMedicalEquipmentByIdController);
medicalEquipmentRouter.get('/sr/:serialNumber', getMedicalEquipmentBySRController);
medicalEquipmentRouter.patch('/id/:equipmentId', updateMedicalEquipmentController);

module.exports = medicalEquipmentRouter;
