const reproWellCategoryModel = require('../Models/models.reproWellCategory.js');

const reproWellCategoriesServices = async () => {
    return await reproWellCategoryModel.find();
}

module.exports = reproWellCategoriesServices 