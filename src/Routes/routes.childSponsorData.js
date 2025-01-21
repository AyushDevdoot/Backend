const { createChildSponsorDataController, getChildSponsorDataController, getChildSponsorDetailsController } = require('../Controllers/controller.childSponsorData');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const childSponsorRouter = require('express').Router();

childSponsorRouter.post('/', verifyUserMiddleware, createChildSponsorDataController);
childSponsorRouter.get('/:id', verifyUserMiddleware, getChildSponsorDetailsController);
childSponsorRouter.get('/', verifyUserMiddleware, getChildSponsorDataController);

module.exports = childSponsorRouter;