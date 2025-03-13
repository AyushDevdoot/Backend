const reproWellExpertModel = require('../Models/model.reproWellExpert.js');

const reproWellExportService = async (categoryName) => {
    return await reproWellExpertModel.find({ categoryName });
}

module.exports = reproWellExportService;