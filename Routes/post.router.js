const express = require('express');
const postController = require('../Controllers/post.controller');
const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', postController.postPost);
postRouter.put('/:id', postController.putPost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;