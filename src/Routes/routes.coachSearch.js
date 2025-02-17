const { searchCoachesByName, searchCoachesByCategory, searchCoachesByLanguage, searchCoachesBySorted } = require('../Controllers/coaches/controller.searchCoaches');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachSearchRouter = require('express').Router();

coachSearchRouter.get('/search-by-name', verifyUserMiddleware, searchCoachesByName);

coachSearchRouter.get('/sort', verifyUserMiddleware, searchCoachesBySorted);

coachSearchRouter.get('/search-by-language', verifyUserMiddleware, searchCoachesByLanguage);

coachSearchRouter.get('/search-by-category', verifyUserMiddleware, searchCoachesByCategory);

module.exports = coachSearchRouter;

