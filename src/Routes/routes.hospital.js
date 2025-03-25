const express = require('express');
const router = express.Router();
const {
    createHospitalController,
    searchHospitalsController,
    getHospitalDetailsController,
    updateHospitalController
} = require('../Controllers/controllers.hospital');

// Create new hospital
router.post('/hospitals', createHospitalController);
router.get('/hospitals/search', searchHospitalsController);
router.get('/hospitals/:hospitalId', getHospitalDetailsController);
router.put('/hospitals/:hospitalId', updateHospitalController);

module.exports = router;