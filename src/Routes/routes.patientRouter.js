const patientRouter = require('express').Router();
const { verifyUserMiddleware } = require('../Middleware/userAuth');
const { createPatientDetailsController, getPatientDetailsController } = require('../Controllers/controllers.patient');


patientRouter.post('/store-patient-details', verifyUserMiddleware, createPatientDetailsController);


patientRouter.get('/get-patient-details/:id', verifyUserMiddleware, getPatientDetailsController);

module.exports = patientRouter;