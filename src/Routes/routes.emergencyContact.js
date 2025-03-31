const { addEmergencyContactController, getEmergencyContactController, getEmergencyContactDetailsController, updateEmergencyContactController } = require('../Controllers/controller.emergencyContact');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const emergencyContactRouter = require('express').Router();

emergencyContactRouter.post('/', verifyUserMiddleware, addEmergencyContactController)
emergencyContactRouter.get('/:contactId', verifyUserMiddleware, getEmergencyContactDetailsController)
emergencyContactRouter.get('/', verifyUserMiddleware, getEmergencyContactController)
emergencyContactRouter.patch('/:contactId', verifyUserMiddleware, updateEmergencyContactController)

module.exports = emergencyContactRouter;