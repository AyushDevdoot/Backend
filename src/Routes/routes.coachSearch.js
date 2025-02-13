const { searchCoachesByName, searchCoachesByCategory, searchCoachesByLanguage, searchCoachesBySorted } = require('../Controllers/coaches/controller.searchCoaches');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const coachSearchRouter = require('express').Router();

coachSearchRouter.get('/search-by-name', searchCoachesByName);

coachSearchRouter.get('/sort', searchCoachesBySorted);

coachSearchRouter.get('/search-by-language', searchCoachesByLanguage);

coachSearchRouter.get('/search-by-category', searchCoachesByCategory);

module.exports = coachSearchRouter;

