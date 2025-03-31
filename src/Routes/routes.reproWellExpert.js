const reproWellExpertRouter = require('express').Router();

const reproWellExpertController = require('../Controllers/controller.reproWellExpertController.js');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

reproWellExpertRouter.get('/', verifyUserMiddleware, reproWellExpertController);

module.exports = reproWellExpertRouter;