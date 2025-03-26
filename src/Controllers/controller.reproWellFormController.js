const { sendResponse } = require('../Helpers/helpers.commonFunc.js');
const reproWellFormService = require('../Services/services.reproWellFormService.js');
const { createReproWellFormDto, validateReproWellForm} = require('../DTOs/reproWell.dto.js');

const reproWellFormController = async (req, res) => {
    try {
        const formData = createReproWellFormDto(req.body);
        const { errors, isValid} = validateReproWellForm(formData);

        if (errors && !isValid) {
            return sendResponse(res, errors, 400, false, 'Validation failed');
        }

        const savedForm = await reproWellFormService({...formData,createdBy: req.user._id});
        
        return sendResponse(res, null, 200, true, 'Form created successfully', savedForm);
        
    } catch (error) {
        console.error('Error in reproWellFormController:', error);
        return sendResponse(res, error, 500, false, 'Internal server error');
    }
}

module.exports = reproWellFormController;