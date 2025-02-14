const SpecialistCategoriesModel = require("../Models/models.specialistCategories");
const Counter = require("../Models/models.counterForAll");

const createNewSpecialization = async (data) => {
	const counterUpdate = await Counter.findOneAndUpdate({counter_for: 'specialistcategories'},{ $inc: {counter_value: 1}},{upsert: true, new: true});
	const finalBody = new SpecialistCategoriesModel({autoId: counterUpdate.counter_value, categoryName: data.specialization, isActive: data.isActive});

	await finalBody.save();
	return { id: counterUpdate };
};

const getAllSpecializations = async () => {
	return await SpecialistCategoriesModel.find();
};

const getSpecializationByCounterId = async (id) => {
	return await CoachInfoModel.findOne({ autoId: id });
};

const getSpecializationBy_Id = async (_id) => {
	return await CoachInfoModel.findOne({ _id: _id });
};

module.exports = {
	createNewSpecialization,
	getAllSpecializations,
	getSpecializationByCounterId,
	getSpecializationBy_Id
};
