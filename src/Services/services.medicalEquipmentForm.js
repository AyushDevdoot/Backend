const MedicalEquipmentFormModel = require("../Models/models.medicalEquipmentForm")

const createMedicalEquipmentFormServices = async (body) => {
    const finalBody = new MedicalEquipmentFormModel(body)
    return await finalBody.save()
}

const getMedicalEquipmentFormServices = async () => {
    return await MedicalEquipmentFormModel.find({})
}

module.exports = {
    createMedicalEquipmentFormServices,
    getMedicalEquipmentFormServices
}