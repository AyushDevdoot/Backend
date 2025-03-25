const express = require("express");
const { getNearbyHospitals } = require('../Controllers/controllers.nearbyHospitals');

const router = express.Router();

router.get("/hospitals", getNearbyHospitals);

module.exports = router;
