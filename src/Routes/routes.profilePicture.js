const profilePictureRouter = require('express').Router();
const upload = require("../Middleware/multer");
const { verifyUserMiddleware } = require("../Middleware/userAuth");

const { uploadProfilePicController, updateProfilePicController, getProfilePicController } = require('../Controllers/controller.profilePicture.js');

profilePictureRouter.post('/upload', verifyUserMiddleware, upload.single('image'), uploadProfilePicController);

profilePictureRouter.put('/update', verifyUserMiddleware, upload.single('image'), updateProfilePicController);

profilePictureRouter.get('/:userId', verifyUserMiddleware, getProfilePicController);

module.exports = profilePictureRouter;