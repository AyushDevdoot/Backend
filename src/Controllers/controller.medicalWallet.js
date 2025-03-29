const UserModel = require("../Models/models.user");
const { sendResponse } = require('../Helpers/helpers.commonFunc');
const { uploadMedicalWalletService, getMedicalWalletService } = require('../Services/services.medicalWallet.js');

const uploadMedicalWalletController = async (req, res) => {
    try {
        const fileObj = req.file;

        if (!fileObj) return res.status(400).json({ error: "No file uploaded"});

        const user = await UserModel.findOne({ _id: req.user._id });

        if (!user) return res.status(404).json({ error: "User not found"});

        const documents = await uploadMedicalWalletService({userId: user._id, documentName: req.body.documentName, uploadType: req.body.uploadType , pdfUrl: fileObj.path});

        sendResponse(res, null, 200, true, "document uploaded successfully", documents);
    } catch (error) {
        sendResponse(res, error);
    }
}

const getMedicalWalletController = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) return sendResponse(res, null, 404, false, 'userId not found');

        const documents = await getMedicalWalletService(userId);

        sendResponse( res, null, 200, true, 'document found successfully', documents);
    } catch (error) {
        sendResponse(res, error);
    }
};

module.exports = { uploadMedicalWalletController, getMedicalWalletController };
