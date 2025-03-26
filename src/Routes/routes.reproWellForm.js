const reproWellFormRouter = require('express').Router();

const reproWellFormController = require('../Controllers/controller.reproWellFormController.js');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

reproWellFormRouter.post('/', verifyUserMiddleware, reproWellFormController);

module.exports = reproWellFormRouter;