const { createCorporatePackageRequestController } = require('../Controllers/controller.corporatePackageRequest');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const corporatePackageRequestRouter = require('express').Router();

corporatePackageRequestRouter.post('/', verifyUserMiddleware, createCorporatePackageRequestController);

module.exports = corporatePackageRequestRouter;