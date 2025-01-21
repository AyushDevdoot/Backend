const createRentalEquipmentConditionController = async (req, res) => {
    try {
        const equipmentBody = createEquipmentDto(req.body);
        const errors = validateEquipmentFields(equipmentBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createRentalEquipmentConditionServices(equipmentBody);
        sendResponse(res, null, 201, true, "Equipment created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
    }
};

const getRentalEquipmentConditionByIdController = async (req, res) => {
    try {
        const equipment = await getRentalEquipmentConditionByIdServices(req.params.equipmentId);
        if (!equipment) {
            sendResponse(res, null, 400, false, "Equipment not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Equipment fetched successfully", equipment);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};


module.exports = {
    createRentalEquipmentConditionController,
    getRentalEquipmentConditionByIdController,
};