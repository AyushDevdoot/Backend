const { createGirlSafteyController, getGirlSafteyDetailsController, getGirlSafteyController, updateGirlSafteyController } = require('../Controllers/controller.girlSaftey');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const girlSafteyRouter = require('express').Router();

girlSafteyRouter.post('/', verifyUserMiddleware, createGirlSafteyController);
girlSafteyRouter.get('/:girlSafteyId', getGirlSafteyDetailsController);
girlSafteyRouter.get('/', getGirlSafteyController);
girlSafteyRouter.patch('/:girlSafteyId', updateGirlSafteyController);

module.exports = girlSafteyRouter;