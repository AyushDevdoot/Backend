const UserInfoModel = require("../Models/models.userInfo");

const createUserInfoServices = async (userInfo) => {
	const finalBody = new UserInfoModel(userInfo);
	return await finalBody.save();
};

const getUserInfoServices = async (query) => {
	return await UserInfoModel.find(query);
};

const getUserInfoByIdServices = async (userId) => {
	return await UserInfoModel.find({ _id: userId });
};

const updateUserInfoServices = async (userId, userInfoBody) => {
	return await UserInfoModel.updateOne({ _id: userId }, userInfoBody);
};

const getUserInfoByMobileServices = async (mobile) => {
	return await UserInfoModel.findOne({ mobile: mobile });
};

const userExistsByMobileServices = async (mobile) => {
	return await UserInfoModel.exists({mobile: mobile});
};
module.exports = {
	createUserInfoServices,
	getUserInfoServices,
	userExistsByMobileServices,
	getUserInfoByMobileServices,
	getUserInfoByIdServices,
	updateUserInfoServices
};
