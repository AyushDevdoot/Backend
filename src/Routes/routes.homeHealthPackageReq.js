const { createHomeHealthPackageReqController } = require('../Controllers/controller.homeHealthPackageReq');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const homeHealthPackageReqRouter = require('express').Router();

homeHealthPackageReqRouter.post('/', verifyUserMiddleware, createHomeHealthPackageReqController);

module.exports = homeHealthPackageReqRouter;