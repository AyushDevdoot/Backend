const reproWellCategoriesServices   = require('../Services/service.reproWellCategoriesServices.js')
const { sendResponse } = require('../Helpers/helpers.commonFunc.js')

const reproWellCategoriesController = async (req,res) => {
    try {
        const categories =  await reproWellCategoriesServices();
        sendResponse(res, null, 200, true, 'got the reproWell Categories', categories);
    } catch {
        sendResponse( res, statusCode = 404, message= "cannot find reproductive health Categories.");
    }
}

module.exports = reproWellCategoriesController 