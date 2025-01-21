const { createDietCounsellingController } = require('../Controllers/controller.dietCounselling');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const dietCounsellingRouter = require('express').Router();

dietCounsellingRouter.post('/', verifyUserMiddleware, createDietCounsellingController);

module.exports = dietCounsellingRouter;