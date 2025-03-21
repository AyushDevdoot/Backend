const profilePictureRouter = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { verifyUserMiddleware } = require("../Middleware/userAuth");

const { uploadProfilePicController, getProfilePictureController } = require('../Controllers/controller.profilePicture.js');

profilePictureRouter.post('/upload', verifyUserMiddleware, upload.single('image'), uploadProfilePicController);

profilePictureRouter.get('/:userId', verifyUserMiddleware, getProfilePictureController);

module.exports = profilePictureRouter;