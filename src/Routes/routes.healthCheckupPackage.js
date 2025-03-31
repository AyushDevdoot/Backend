const { createHelathCheckupPackageController, getHealthCheckupPackageController, getHealthCheckupPackageDetailsController, updateHealthCheckupPackageController } = require('../Controllers/controller.healthCheckupPackage');

const healthCheckupPackageRouter = require('express').Router();

healthCheckupPackageRouter.post('/', createHelathCheckupPackageController);
healthCheckupPackageRouter.get('/', getHealthCheckupPackageController);
healthCheckupPackageRouter.get('/:healthCheckupPackageId', getHealthCheckupPackageDetailsController);
healthCheckupPackageRouter.patch('/:healthCheckupPackageId', updateHealthCheckupPackageController);

module.exports = healthCheckupPackageRouter;