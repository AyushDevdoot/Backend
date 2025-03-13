const { sendResponse } = require('../Helpers/helpers.commonFunc.js');
const reproWellFormService = require('../Services/service.reproWellFormService.js');
const createReproWellFormDTO = require('../DTOs/reproWell.dto.js');

const reproWellFormController = async (req, res) => {
    try {
        const formData = createReproWellFormDTO(req.body);
        // const errors = validateReproWellForm(formData);

        await reproWellFormService(formData);
    } catch (error) {
        sendResponse(res,error);
    }
}

module.exports = reproWellFormController;