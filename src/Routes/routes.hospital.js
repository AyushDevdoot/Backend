const { createHospitalController, updateHospitalController, getHospitalDetailsController, getHospitalController, hospitalQuerySearchController } = require('../Controllers/controller.hospital');

const hospitalRouter = require('express').Router();

hospitalRouter.post('/', createHospitalController);
hospitalRouter.patch('/:hospitalId', updateHospitalController);
hospitalRouter.get('/search', hospitalQuerySearchController);
hospitalRouter.get('/:hospitalId', getHospitalDetailsController);
hospitalRouter.get('/', getHospitalController);

module.exports = hospitalRouter;