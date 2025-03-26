const medicalWalletRouter = require('express').Router();
const {uploadMedicalWalletController, getMedicalWalletController} = require('../Controllers/controller.medicalWallet.js');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const upload = require('../Middleware/multer.js');

medicalWalletRouter.post('/', verifyUserMiddleware, upload.single('file'), uploadMedicalWalletController);

medicalWalletRouter.get('/:userId', verifyUserMiddleware, getMedicalWalletController);

module.exports = medicalWalletRouter;