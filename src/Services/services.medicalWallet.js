const medicalDocModel = require('../Models/models.medicalDocument.js');

const uploadMedicalWalletService = async (documentDetails) => {
    return await medicalDocModel.create(documentDetails);
}

const getMedicalWalletService = async (userId) => {
    return await medicalDocModel.find({userId});
}

module.exports = { uploadMedicalWalletService, getMedicalWalletService };