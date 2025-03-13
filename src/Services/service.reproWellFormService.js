const reproWellFormModel = require('../Models/model.reproWellForm.js');

const reproWellFormService = async (formData) => {
    return await reproWellFormModel.create(formData);
}

module.exports = reproWellFormService