const prescriptionRouter = require("express").Router();
const multer = require("multer");
const { verifyUserMiddleware } = require("../Middleware/userAuth");
const { createPrescriptionController } = require("../Controllers/controller.prescription");
const upload = multer();


prescriptionRouter.post("/", verifyUserMiddleware, upload.any(), createPrescriptionController);

module.exports = prescriptionRouter;