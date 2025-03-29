const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "uploads";
    let resourceType = "image";
    let allowedFormats = ['jpg', 'png', 'jpeg', 'pdf'];
    let format = file.mimetype.split('/')[1];

    // Check if uploading to medical wallet
    if (req.body.uploadType === "medical-wallet") {
      folder = "medical-wallet";
      resourceType = file.mimetype === 'application/pdf' ? 'raw' : 'image';
    } else if (req.body.uploadType === "profile-picture") {
      folder = "profile-pictures";
    }

    return {
      folder: folder,
      format: file.mimetype === 'application/pdf' ? 'pdf' : format,
      public_id: uuidv4(),
      resource_type: resourceType,
    };
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(new Error("No file selected"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
