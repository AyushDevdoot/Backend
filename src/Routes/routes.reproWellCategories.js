const reproWellCategoriesRouter = require('express').Router();

const reproWellCategoriesController = require('../Controllers/controller.reproWellCategoriesController.js');

reproWellCategoriesRouter.get('/', reproWellCategoriesController);

module.exports = reproWellCategoriesRouter 