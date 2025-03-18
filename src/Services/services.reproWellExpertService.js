const reproWellExpertModel = require('../Models/models.reproWellExpert.js');

const reproWellExportService = async (categoryName) => {
    return await reproWellExpertModel.find({ categoryName });
}

module.exports = reproWellExportService;