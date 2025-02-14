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


const refreshCounterAndSpecializations = async () => {
    try {
        // Reset the counter value to 0 or any desired starting value
        const resetCounter = await Counter.findOneAndUpdate(
            { counter_for: 'specialistcategories' }, // Look for the counter for specialist categories
            { $set: { counter_value: 0 } }, // Reset the counter value to 0
            { upsert: true, new: true } // Create the counter if it doesn't exist
        );

        // Remove all records from the SpecialistCategoriesModel collection
        const deleteSpecializations = await SpecialistCategoriesModel.deleteMany({});

        return {
            success: true,
            message: "Counter and Specializations have been refreshed successfully.",
            resetCounterValue: resetCounter.counter_value,
            deletedCount: deleteSpecializations.deletedCount,
        };
    } catch (error) {
        console.error("Error refreshing counter and specializations:", error);
        return {
            success: false,
            message: "Error occurred while refreshing counter and specializations.",
            error: error.message,
        };
    }
};


module.exports = {
	createNewSpecialization,
	getAllSpecializations,
	getSpecializationByCounterId,
	getSpecializationBy_Id
};
