const profilePictureRouter = require('express').Router();
const upload = require("../Middleware/multer");
const { verifyUserMiddleware } = require("../Middleware/userAuth");

const { uploadProfilePicController, getProfilePicController } = require('../Controllers/controller.profilePicture.js');

profilePictureRouter.post('/upload', verifyUserMiddleware, upload.single('image'), uploadProfilePicController);

profilePictureRouter.get('/:userId', verifyUserMiddleware, getProfilePicController);

module.exports = profilePictureRouter;