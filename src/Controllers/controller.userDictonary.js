const { updateUserDictonaryDto } = require("../DTOs/userDictonaryUpdateDto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { getUserDictonaryServices, updateUserDictonaryServices, deleteUserDictonaryServices } = require("../Services/services.userDictonary");

const updateUserDictonaryController = async (req, res) => {
    try {
        // Fetch the user dictionary from the database
        const userDictonary = await getUserDictonaryServices(req.user._id);

        if (!userDictonary) {
            // If the user dictionary is not found, return a 400 error
            sendResponse(res, null, 400, false, "User dictionary not found");
            return;
        }

        // Prepare the data for updating the dictionary
        const userDictonaryBody = updateUserDictonaryDto(req.body);
        let query = {};
        console.log(req.user._id);
        // Loop through each key of the request body and update the corresponding array in the dictionary
        Object.keys(userDictonaryBody).forEach(key => {
            if (userDictonaryBody[key]) {
                // Dynamically create the update query for pushing data into arrays in the dictionary
                query = {
                    $push: { [key]: userDictonaryBody[key] }
                };
            }
        });

        // If there are changes, update the user dictionary in the database
        if (Object.keys(query).length > 0) {
            await updateUserDictonaryServices(req.user._id, query);
            sendResponse(res, null, 200, true, "User dictionary updated successfully");
        } else {
            sendResponse(res, null, 400, false, "No valid fields to update");
        }
    } catch (err) {
        // Handle errors and send response
        console.error(err);
        sendResponse(res, err);
    }
};


const getUserDictonaryController = async (req, res) => {
    try {
        const userDictonary = await getUserDictonaryServices(req.user._id);
        console.log(userDictonary);
        if (!userDictonary) {
            sendResponse(res, null, 400, false, "User dictionary not found");
            return
        } else {
            sendResponse(res, null, 200, true, "User dictionary fetched successfully", userDictonary);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};


const deleteUserDictonaryController = async (req, res) => {
    try {
        const userDictonary = await getUserDictonaryServices(req.user._id);

        if (!userDictonary) {
            sendResponse(res, null, 400, false, "User dictionary not found");
            return;
        }

        await deleteUserDictonaryServices(req.user._id, req.params.id);
        sendResponse(res, null, 200, true, "User dictionary deleted successfully");
    } catch (err) {
        sendResponse(res, err);
    }
};
module.exports = {
    updateUserDictonaryController,
    getUserDictonaryController,
    deleteUserDictonaryController
};