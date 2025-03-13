const reproWellFormController = require('../Controllers/controller.reproWellFormController.js');

const reproWellFormRouter = require('express').Router();

reproWellFormRouter.post('/', reproWellFormController);

module.exports = reproWellFormRouter;