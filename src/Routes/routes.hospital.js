const express = require('express');
const router = express.Router();
const { getNearbyHospitalsController } = require('../controllers/hospital.controller');
const { validateRequest } = require('../middlewares/validateRequest');
const { hospitalSearchDTO } = require('../dto/hospital.dto');

router.get(
    '/hospitals/nearby',
    validateRequest(hospitalSearchDTO),
    getNearbyHospitalsController
);

module.exports = router;