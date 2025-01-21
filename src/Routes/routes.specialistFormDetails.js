const { createSpecialistFormController } = require("../Controllers/controller.specialistForm");
const { verifyUserMiddleware } = require("../Middleware/userAuth");

const specialistFormRouter = require("express").Router();

specialistFormRouter.post("/", verifyUserMiddleware, createSpecialistFormController);

module.exports = specialistFormRouter;