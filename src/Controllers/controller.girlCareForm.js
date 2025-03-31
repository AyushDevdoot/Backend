const girlCareFormServices = require('../Services/services.girlCareForm.js');
const { createGirlCareFormDto, validateGirlCareForm } = require('../DTOs/girlCare.dto.js');
const { sendResponse } = require('../Helpers/helpers.commonFunc.js');

const girlCareFormController = async (req, res) => {
    try {
        const formData = createGirlCareFormDto(req.body);
        const { errors, isValid } = validateGirlCareForm(formData);

        if ( errors && !isValid ) return sendResponse(res, errors); 

        const savedForm = await girlCareFormServices(formData);
        return sendResponse(res, null, 200, true, 'girlCareForm created successfully.', savedForm);

    } catch (error) {
        console.log(error);
        sendResponse( res, error);
    }
}

module.exports = girlCareFormController;