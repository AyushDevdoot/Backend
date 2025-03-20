const admin = require("firebase-admin");
const serviceAccount = require("../../devdoot-backend-firebase-adminsdk-fbsvc-ce80a1a2d2.json");
const { getStorage } = require("firebase-admin/storage");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});


const bucket = getStorage().bucket();

// Upload File to Firebase
const uploadProfilePicService = async (file, folder) => {
    return new Promise((resolve, reject) => {
        if (!file) return reject("No file provided");

        const filename = `${folder}/${Date.now()}-${file.originalname}`;
        const fileUpload = bucket.file(filename);

        // Check if the file is an image
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return reject('Only image files (JPEG, PNG, GIF, WEBP) are allowed');
        }

        const stream = fileUpload.createWriteStream({
            metadata: { contentType: file.mimetype },
        });

        stream.on("error", (err) => reject(err));

        stream.on("finish", async () => {
            await fileUpload.makePublic(); // Make file publicly accessible
            resolve(`https://storage.googleapis.com/${bucket.name}/${filename}`);
        });

        stream.end(file.buffer);
    });
};

// Get Profile Picture from Firebase
const getProfilePicture = async (filename) => {
    try {
        const file = bucket.file(filename);
        const exists = await file.exists();
        
        if (!exists[0]) {
            throw new Error('File not found');
        }

        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
        });

        return url;
    } catch (error) {
        throw new Error(`Error getting profile picture: ${error.message}`);
    }
};

module.exports = { uploadProfilePicService, getProfilePicture };
