const userModel = require("../Models/models.user");
const prescribeDocModel = require("../Models/models.prescribeDoc");


const uploadPrescribeController = async (req, res) => {
    try {
        const fileObj = req.file;
        if (!fileObj) return res.status(400).json({ error: "No file uploaded" });

        const user = await userModel.findOne({ _id: req.user._id });

        if (!user) return res.status(404).json({ error: "User not found" });

        console.log({ fileUrl: fileObj.path });
        
        const userPrescription = await prescribeDocModel.create({ 
            userId: user._id, 
            patientName: `${user.firstName} ${user.lastName}`,
            prescriptionUrl: fileObj.path,
            uploadDate: new Date()
        });

        res.status(201).json({ message: "Prescription uploaded successfully", userPrescription });
    } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error });
    }
};

const getPrescribeDocController = async (req, res) => {
    try {
        const prescriptions = await prescribeDocModel.find({ userId: req.user._id });
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch prescriptions", details: error });
    }
};

module.exports = {
    uploadPrescribeController,
    getPrescribeDocController
};