const { createImmunicareController, getImmunicareController } = require('../Controllers/controller.immunicare');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const immunicareRouter = require('express').Router();

immunicareRouter.post('/', verifyUserMiddleware, createImmunicareController);
immunicareRouter.get('/', verifyUserMiddleware, getImmunicareController);

module.exports = immunicareRouter;