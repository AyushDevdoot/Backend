const { createSponsorFormController } = require('../Controllers/controller.childSponsorForm');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const childSponsorFormRouter = require('express').Router();

childSponsorFormRouter.post('/', verifyUserMiddleware, createSponsorFormController);

module.exports = childSponsorFormRouter;