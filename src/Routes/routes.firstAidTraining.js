const { createFirstAidTrainingController } = require('../Controllers/controller.firstAidTraining');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const firstAidTrainingRouter = require('express').Router();

firstAidTrainingRouter.post('/', verifyUserMiddleware, createFirstAidTrainingController);

module.exports = firstAidTrainingRouter;