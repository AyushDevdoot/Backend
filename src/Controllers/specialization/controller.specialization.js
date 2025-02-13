const {  validateCoachSortedSearchDto } = require("../../DTOs/search.dto");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const {  getCoachesSorted } = require("../../Services/services.searchCoaches");


const createSpecializations = async () => {
    try {
        const search_data = coachNameSearchDto(req.query);
        const errors = validateCoachNameSearchDto(search_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        console.log('--->',search_data)
        let result = await getCoachesByName(search_data);
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }

        sendResponse(res, null, 201, true, result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }

};

const searchSpecializations = async (req, res) => {
    try {
        const search_data = coachNameSearchDto(req.query);
        const errors = validateCoachNameSearchDto(search_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        console.log('--->',search_data)
        let result = await getCoachesByName(search_data);
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }

        sendResponse(res, null, 201, true, result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }
};


const searchSpecialization = async (req, res) => {
    try {
        const search_data = coachNameSearchDto(req.query);
        const errors = validateCoachNameSearchDto(search_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        console.log('--->',search_data)
        let result = await getCoachesByName(search_data);
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }

        sendResponse(res, null, 201, true, result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }
};



const searchCoachesByCategory = async (req, res) => {
    try {
        const search_data = coachCategorySearchDto(req.query);
        const errors = validateCoachCategorySearchDto(search_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        let result = await getCoachesByCategory(search_data);
        console.log(result);
        if (result.total_results === 0){
            sendResponse(res, null, 204, true, message = "No Result Found",result);
            return
        }

        sendResponse(res, null, 201, true, result);
    }catch (err) {
        console.log(err);
        sendResponse(res, err, 500);
    }
};

module.exports = {
};
