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
userRouter.post('/isSubscribed/:id', userController.isSubscribed);
userRouter.get('/upvotes/:id', userController.getUserUpvotes);
userRouter.get('/downvotes/:id', userController.getUserDownvotes);
userRouter.get('/comments/upvotes/:id', userController.getUserCommentUpvotes);
userRouter.get('/comments/downvotes/:id', userController.getUserCommentDownvotes);
userRouter.post('/upvotes/:id', userController.addUserUpvote);
userRouter.post('/downvotes/:id', userController.addUserDownvote);
userRouter.post('/comments/upvotes/:id', userController.addUserCommentUpvote);
userRouter.post('/comments/downvotes/:id', userController.addUserCommentDownvote);
userRouter.post('/upvotes/remove/:id', userController.removeUserUpvote);
userRouter.post('/downvotes/remove/:id', userController.removeUserDownvote);
userRouter.post('/comments/upvotes/remove/:id', userController.removeUserCommentUpvote);
userRouter.post('/comments/downvotes/remove/:id', userController.removeUserCommentDownvote);
userRouter.post('/checkpseudo', userController.checkPseudo);
userRouter.post('/checkmail', userController.checkMail);

module.exports = userRouter;