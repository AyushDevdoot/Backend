const { createCorporateHealthController, getCorporateHealthController, getCorporateHealthDetailsController, updateCorporateHealthController } = require('../Controllers/controller.corporateHealth');

const corporateHealthRouter = require('express').Router();

corporateHealthRouter.post('/', createCorporateHealthController);
corporateHealthRouter.get('/:corporateHealthId', getCorporateHealthDetailsController);
corporateHealthRouter.get('/', getCorporateHealthController);
corporateHealthRouter.patch('/:corporateHealthId', updateCorporateHealthController);

module.exports = corporateHealthRouter;