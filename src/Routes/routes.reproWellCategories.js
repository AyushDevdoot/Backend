const reproWellCategoriesRouter = require('express').Router();

const reproWellCategoriesController = require('../Controllers/controller.reproWellCategoriesController.js');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

reproWellCategoriesRouter.get('/', verifyUserMiddleware, reproWellCategoriesController);

module.exports = reproWellCategoriesRouter 