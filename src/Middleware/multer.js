const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: file.mimetype.includes("pdf") ? "pdfs" : "profile-pics",
      format: file.mimetype.includes("image") ? "webp" : undefined, // Convert images to WebP
    };
  },
});

const upload = multer({ 
                        storage, 
                        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
                        fileFilter: (req, file, cb) => {
                        if (!file) {
                            return cb(new Error("No file selected"), false);
                        }
                        cb(null, true);
                    }, });

module.exports = upload;
