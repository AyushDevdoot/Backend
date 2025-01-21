const { getUserDictonaryController, updateUserDictonaryController, deleteUserDictonaryController } = require('../Controllers/controller.userDictonary');
const { verifyUserMiddleware } = require('../Middleware/userAuth');

const userDictonaryRouter = require('express').Router();

userDictonaryRouter.patch('/', verifyUserMiddleware, updateUserDictonaryController);
userDictonaryRouter.get('/', verifyUserMiddleware, getUserDictonaryController);
userDictonaryRouter.delete('/:id', verifyUserMiddleware, deleteUserDictonaryController);

module.exports = userDictonaryRouter;