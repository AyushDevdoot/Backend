const express = require('express');
const router = express.Router();
const { getNearbyHospitalsController } = require('../Controllers/hospital.controller');
const { validateRequest } = require('../Middlewares/validateRequest');
const { hospitalSearchDTO } = require('../DTOs/hospital.dto');

router.get(
    '/hospitals/nearby',
    validateRequest(hospitalSearchDTO),
    getNearbyHospitalsController
);

module.exports = router;