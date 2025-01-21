const { getHomeHealthPackageController, createHomeHealthPackageController } = require('../Controllers/controller.homeHealthPackage');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const homeHealthPackageRouter = require('express').Router();

homeHealthPackageRouter.post('/', verifyUserMiddleware, createHomeHealthPackageController);
homeHealthPackageRouter.get('/', verifyUserMiddleware, getHomeHealthPackageController);

module.exports = homeHealthPackageRouter;