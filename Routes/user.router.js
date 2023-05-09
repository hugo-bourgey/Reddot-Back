const express = require('express');
const userController = require('../Controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.postUser);
userRouter.put('/:id', userController.putUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/subscribe/:id', userController.subscribeToSubreddot);
userRouter.put('/unsubscribe/:id', userController.unsubscribeToSubreddot);
userRouter.get('/isSubscribed/:id', userController.isSubscribed);

module.exports = userRouter;