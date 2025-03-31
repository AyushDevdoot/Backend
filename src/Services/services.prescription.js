const PrescriptionModel = require("../Models/models.prescription");

const createPrescriptionServices = async (prescription) => {
    const finalBody = new PrescriptionModel(prescription);
    return await finalBody.save();
}

module.exports = {
    createPrescriptionServices
}