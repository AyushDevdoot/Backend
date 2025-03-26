const { sendResponse } = require('../Helpers/helpers.commonFunc');
const reproWellExpertService = require('../Services/services.reproWellExpertService.js');

const reproWellExpertController = async (req,res) => {
    try {
        const {categoryName} = req.body;
        const experts = await reproWellExpertService(categoryName);

        if (!experts || experts.length === 0) {
            return sendResponse(res, null, 404, false, 'No experts found for this category', null);
        }

        return sendResponse(res, null, 200, true, 'found the reproWell Experts', experts);
        
    } catch (error) {
        sendResponse(res, error, 500, false, 'Some internal issue', null);
    }
}

module.exports = reproWellExpertController;