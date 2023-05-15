const express = require('express');
const postController = require('../Controllers/post.controller');
const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.get('/date', postController.getAllPostsByDate);
postRouter.get('/popularity', postController.getAllPostsByPopularity);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/sub/:postSub', postController.getPostsBySubId);
postRouter.post('/', postController.postPost);
postRouter.put('/:id', postController.putPost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;