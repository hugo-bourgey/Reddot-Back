const express = require('express');
const commentController = require('../Controllers/comment.controller');
const commentRouter = express.Router();

commentRouter.get('/', commentController.getAllComments);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.get('/post/:commentPost', commentController.getCommentsByPostId);
commentRouter.post('/', commentController.postComment);
commentRouter.put('/:id', commentController.putComment);
commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;