const cloudinary = require("../../cloudinary");
const profilePicModel = require("../models/models.profilePicture");

const uploadProfilePictureService = async (file, folder) => {
    console.log({file,folder});

    if (!file || !file.buffer) {
        throw new Error("Invalid file input");
    }
    if (!folder) {
        throw new Error("Folder path is required");
    }

    // const uploadOptions = {
    //     folder,
    //     resource_type: "image",
    //     allowed_formats: ["jpg", "png", "jpeg"],
    //     transformation: [{ quality: "auto" }],
    // };
    console.log(file);
    return { file };
    
    // return new Promise((resolve, reject) => {
    //     console.log('hello');
    //     const uploadStream = cloudinary.uploader.upload_stream(
    //         uploadOptions,
    //         (error, result) => {
    //             if (error) {
    //                 console.error("❌ Cloudinary Upload Error:", error);
    //                 return reject(new Error(`Cloudinary upload failed: ${error.message || error}`));
    //             }
    //             console.log("✅ Cloudinary Upload Result:", result);
    //             resolve(result);
    //         }
    //     );

    //     console.log("🔹 Piping file stream...");
    //     file.stream.pipe(uploadStream);
    // });
};


const getProfilePictureService = async (userId) => {
    const userProfilePic = await profilePicModel.findOne({ userId });
    return userProfilePic;
  };

module.exports = { uploadProfilePictureService, getProfilePictureService };