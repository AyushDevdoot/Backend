const userModel = require("../Models/models.user");
const profilePicModel = require('../Models/models.profilePicture.js');
const { uploadProfilePicService } = require("../Services/services.profilePicture");

// Upload Profile Picture
const uploadProfilePicController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = await uploadProfilePicService(req.file, "profile-pics");

    const user = await userModel.findById({_id: ObjectId(req.user._id)});

    if (!user) return res.status(404).json({message: "User not found."});

    const userProfilePic = await profilePicModel.create({userId: user._id, name: `${user.firstName} ${user.lastName}`, pictureUrl: imageUrl });

    res.json({ message: "Profile picture uploaded", userProfilePic });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
};


const getProfilePictureController = async (req, res) => {
  try {
    const user = await profilePicModel.findById(req.params.userId);
    if (!user || !user.pictureUrl) return res.status(404).json({ error: "Profile picture not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};



module.exports = { uploadProfilePicController, getProfilePictureController };
