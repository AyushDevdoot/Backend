const reproWellCategoryModel = require('../Models/model.reproWellCategory.js');

const reproWellCategoriesServices = async () => {
    return await reproWellCategoryModel.find();
}

module.exports = reproWellCategoriesServices 