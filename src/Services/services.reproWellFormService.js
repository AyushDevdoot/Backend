const reproWellFormModel = require('../Models/models.reproWellForm.js');

const reproWellFormService = async (formData) => {
    return await reproWellFormModel.create(formData);
}

module.exports = reproWellFormService