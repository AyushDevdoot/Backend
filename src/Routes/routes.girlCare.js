const girlCareFormRouter = require('express').Router();

const girlCareFormController = require('../Controllers/controller.girlCareForm.js');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

girlCareFormRouter.post('/', girlCareFormController);

module.exports = girlCareFormRouter;