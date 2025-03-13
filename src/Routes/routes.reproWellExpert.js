const reproWellExpertRouter = require('express').Router();

const reproWellExpertController = require('../Controllers/controller.reproWellExpertController.js');

reproWellExpertRouter.get('/',reproWellExpertController);

module.exports = reproWellExpertRouter;