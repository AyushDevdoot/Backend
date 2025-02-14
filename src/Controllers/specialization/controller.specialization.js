const { createNewSpecializationDto, validateNewSpecialization, specializationSearchByIdDto, specializationSearchBy_idDto, validateSpecializationId, validateSpecialization_id } = require("../../DTOs/specialist.dto");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const { createNewSpecialization, getAllSpecializations, getSpecializationByCounterId, getSpecializationBy_Id } = require("../../Services/services.specialization");


const createSpecializations = async (req, res) => {
    try {
        const specialization = createNewSpecializationDto(req.query);
        const existing = await getAllSpecializations(); 
        const errors = validateNewSpecialization(specialization, existing);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        } 
        let result = await createNewSpecialization(specialization);
        console.log(result);
        sendResponse(res, null, 201, true, 'Specialization Created',result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }

};

const allSpecialization = async (req, res) => {
    try {
        let result = await getAllSpecializations();
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }
        sendResponse(res, null, 201, true, 'success', result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }


};

const searchSpecializationsById = async (req, res) => {
    try {
        const data = specializationSearchByIdDto(req.query);
        const errors = validateSpecializationId(data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        let result = await getSpecializationByCounterId(search_data);
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }

        sendResponse(res, null, 201, true, 'success', result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }
};


const searchSpecializationBy_id = async (req, res) => {
    try {
        const data = specializationSearchBy_idDto(req.query);
        const errors = validateSpecialization_id(data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        console.log('--->',search_data)
        let result = await getSpecializationBy_Id(data);
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }

        sendResponse(res, null, 201, true, 'success', result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }
};

module.exports = {
createSpecializations,
allSpecialization,
searchSpecializationsById,
searchSpecializationBy_id
};
