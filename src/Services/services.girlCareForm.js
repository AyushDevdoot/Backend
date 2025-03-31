const girlCareFormModel = require('../Models/models.girlCareForm.js');

const girlCareFormServices = async (formData) => {
    return await girlCareFormModel.create(formData);
}

module.exports = girlCareFormServices;