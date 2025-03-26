const profilePicModel = require("../Models/models.profilePicture");


const getProfilePictureService = async (userId) => {
    const userProfilePic = await profilePicModel.findOne({ userId });
    return userProfilePic;
  };

module.exports = { getProfilePictureService };