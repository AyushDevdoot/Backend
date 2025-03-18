const reproWellCategoriesServices   = require('../Services/services.reproWellCategoriesServices.js')
const { sendResponse } = require('../Helpers/helpers.commonFunc.js')

const reproWellCategoriesController = async (req,res) => {
    try {
        
        const categories =  await reproWellCategoriesServices();
        sendResponse(res, null, 200, true, 'got the reproWell Categories', categories);

    } catch (error) {

        sendResponse( res, error, statusCode = 404, message= "cannot find reproductive health Categories.");
    }
}

module.exports = reproWellCategoriesController 