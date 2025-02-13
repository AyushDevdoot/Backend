const { coachNameSearchDto, validateCoachNameSearchDto, coachCategorySearchDto, validateCoachCategorySearchDto, coachLanguageSearchDto, validateCoachLanguageSearchDto, coachSortedSearchDto, validateCoachSortedSearchDto } = require("../../DTOs/search.dto");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const { getCoachesByName, getCoachesByCategory, getCoachesByLanguage, getCoachesSorted } = require("../../Services/services.searchCoaches");


const searchCoachesByName = async (req, res) => {
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


const searchCoachesByLanguage = async (req, res) => {
    try {
        const search_data = coachLanguageSearchDto(req.query);
        const errors = validateCoachLanguageSearchDto(search_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        console.log('--->',search_data)
        let result = await getCoachesByLanguage(search_data);
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


const searchCoachesBySorted = async (req, res) => {
    try {
        const search_data = coachSortedSearchDto(req.query);
        const errors = validateCoachSortedSearchDto(search_data);
        if (Object.keys(errors).length > 0){
            sendResponse(res, null, 422, false, errors);
            return
        }
        console.log('--->',search_data)
        let result = await getCoachesSorted(search_data);
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
    searchCoachesByName,
    searchCoachesByCategory,
    searchCoachesByLanguage,
    searchCoachesBySorted
};
