const { createCorporatePackageController, getCorporatePackageController } = require('../Controllers/controller.corporatePackage');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const corporatePackageRouter = require('express').Router();

corporatePackageRouter.post('/', verifyUserMiddleware, createCorporatePackageController);
corporatePackageRouter.get('/', verifyUserMiddleware, getCorporatePackageController);

module.exports = corporatePackageRouter;