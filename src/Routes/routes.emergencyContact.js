const { addEmergencyContactController, getEmergencyContactController, getEmergencyContactDetailsController, updateEmergencyContactController, deleteEmergencyContactController } = require('../Controllers/controller.emergencyContact');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const emergencyContactRouter = require('express').Router();

emergencyContactRouter.post('/', verifyUserMiddleware, addEmergencyContactController)
emergencyContactRouter.get('/:contactId', verifyUserMiddleware, getEmergencyContactDetailsController)
emergencyContactRouter.get('/', verifyUserMiddleware, getEmergencyContactController)
emergencyContactRouter.patch('/:contactId', verifyUserMiddleware, updateEmergencyContactController)
emergencyContactRouter.delete('/:contactId', verifyUserMiddleware, deleteEmergencyContactController)

module.exports = emergencyContactRouter;