const profilePictureRouter = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { uploadProfilePicController, getProfilePictureController } = require('../Controllers/controller.profilePicture.js');

// POST route remains the same as it expects userId in the request body
profilePictureRouter.post('/upload', upload.single('image'), uploadProfilePicController);

// Modified GET route to include userId parameter
profilePictureRouter.get('/:userId', getProfilePictureController);

module.exports = profilePictureRouter;