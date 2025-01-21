const { careGiverFinderController } = require('../Controllers/controller.careGiverFinder');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const careGiverFinderRouter = require('express').Router();

careGiverFinderRouter.post('/', verifyUserMiddleware, careGiverFinderController);

module.exports = careGiverFinderRouter;