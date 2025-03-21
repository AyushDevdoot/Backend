const { getProfilePictureService } = require("../Services/services.profilePicture.js");
const userModel = require("../Models/models.user");
const profilePicModel = require("../Models/models.profilePicture");


// Upload Profile Picture
const uploadProfilePicController = async (req, res) => {
  try {
    const fileObj = req.file;
    if (!fileObj) return res.status(400).json({ error: "No file uploaded" });

    const user = await userModel.findOne({ _id: req.user._id });

    if (!user) return res.status(404).json({ error: "User not found" });

    const folder = req.file.mimetype.includes("pdf") ? "pdfs" : "profile-pictures";

    console.log({ fileUrl: fileObj.path });
    
    const userProfilePicture = await profilePicModel.create({ userId: user._id, name: `${user.firstName} ${user.lastName}`, imageUrl: fileObj.path });

    res.json({ message: "File uploaded successfully", userProfilePicture });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
};

// Update Profile Picture
const updateProfilePicController = async (req, res) => {
  try {
    const fileObj = req.file;
    if (!fileObj) return res.status(400).json({ error: "No file uploaded" });

    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedProfilePic = await profilePicModel.findOneAndUpdate(
      { userId: user._id },
      { imageUrl: fileObj.path },
      { new: true }
    );

    if (!updatedProfilePic) {
      return res.status(404).json({ error: "Profile picture not found" });
    }

    res.json({ message: "Profile picture updated successfully", updatedProfilePic });
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message });
  }
};

// Get Profile Picture
const getProfilePicController = async (req, res) => {
  try {
    const userProfilePic = await getProfilePictureService(req.params.userId);
    if (!userProfilePic) return res.status(404).json({ message: "Profile picture not found." });
    
    res.json({ userProfilePic });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile picture", details: error.message });
  }
};


module.exports = { uploadProfilePicController, updateProfilePicController, getProfilePicController };
