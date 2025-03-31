const EquipmentModel = require("../Models/models.equipmentInfo")

const createMedicalEquipmentServices = async (body) => {
    const finalBody = new EquipmentModel(body)
    return await finalBody.save()
}

const getMedicalEquipmentByIdServices = async (equipmentId) => {
    return await EquipmentModel.findOne({ _id: equipmentId }).select("-__v")
}

const getMedicalEquipmentBySRServices = async (sr) => {
    return await EquipmentModel.findOne({ serialNumber: sr }).select("-__v")
}

const updateEquipmentServices = async (equipmentId, body) => {
    return await EquipmentModel.findOneAndUpdate({ _id: equipmentId }, body)
}

module.exports = {
    createMedicalEquipmentServices,
    getMedicalEquipmentByIdServices,
    getMedicalEquipmentBySRServices,
    updateEquipmentServices
}