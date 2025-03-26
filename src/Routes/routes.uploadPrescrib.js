const uploadPrescribeRouter = require('express').Router();
const { uploadPrescribeController, getPrescribeDocController } = require('../Controllers/controller.prescribe.js');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const upload = require('../Middleware/multer.js');

uploadPrescribeRouter.post('/', verifyUserMiddleware, upload.single('file'), uploadPrescribeController);

uploadPrescribeRouter.get('/:userId', verifyUserMiddleware, getPrescribeDocController);

module.exports = uploadPrescribeRouter;