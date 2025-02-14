const CoachInfoModel = require("../Models/models.coachInfo");
const PAGE_SIZE = 20;

const getCoachesByName = async (data) => {
    try{
        const { coachName, page } = data;
        let skip = (page-1)*PAGE_SIZE;
        let query = {"coachName": { $regex: `^${coachName}`, $options: "i" }};
        const result = await CoachInfoModel.find(query).skip(skip).limit(PAGE_SIZE);
        const total_results = await CoachInfoModel.countDocuments(query);
	    return { data: result, page, total_results }
    }catch(err){
        console.log(err);
        throw err
    }
};

const getCoachesByCategory = async (data) => {
    try{
        const { category, page } = data;
        let skip = (page-1)*PAGE_SIZE;
        let query = { specialization: category }
        const result = await CoachInfoModel.find(query).skip(skip).limit(PAGE_SIZE);

        const total_results = await CoachInfoModel.countDocuments(query);
        return { data: result, page, total_results }
    }catch(err){
        console.log(err);
        throw err
    }
};

const getCoachesByLanguage = async (data) => {
    try {
        const { language, page } = data;
        let skip = (page - 1) * PAGE_SIZE;
        
        let query = { "languages": { $in: [language] } };
        
        const result = await CoachInfoModel.find(query).skip(skip).limit(PAGE_SIZE);
        
        const total_results = await CoachInfoModel.countDocuments(query);
        
        return { 
            data: result,
            page: page,
            total_results: total_results
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getCoachesSorted = async (data) => {
    try {
        const { sort_by, ascending, page } = data;

        let skip = (page - 1) * PAGE_SIZE;

        const sortOrder = ascending ? 1 : -1;
        const sortQuery = { [sort_by]: sortOrder };

        const result = await CoachInfoModel.find({}).sort(sortQuery).skip(skip).limit(PAGE_SIZE);

        const total_results = await CoachInfoModel.countDocuments({});

        return {
            data: result,
            page,
            total_results
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};


module.exports = {
    getCoachesByName,
    getCoachesByCategory,
    getCoachesByLanguage,
    getCoachesSorted
};

