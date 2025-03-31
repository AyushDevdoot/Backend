const { createFirstAidTrainingController, getFirstAidTrainingController } = require('../Controllers/controller.firstAidTraining');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const firstAidTrainingRouter = require('express').Router();

firstAidTrainingRouter.post('/', verifyUserMiddleware, createFirstAidTrainingController);
firstAidTrainingRouter.get('/', verifyUserMiddleware, getFirstAidTrainingController);

module.exports = firstAidTrainingRouter;