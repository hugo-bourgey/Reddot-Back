const express = require('express');
const subreddotController = require('../Controllers/subreddot.controller');
const subreddotRouter = express.Router();

subreddotRouter.get('/', subreddotController.getAllSubreddots);
subreddotRouter.get('/:id', subreddotController.getSubreddotById);
subreddotRouter.get('/name/:name', subreddotController.getSubreddotByName);
subreddotRouter.post('/', subreddotController.postSubreddot);
subreddotRouter.put('/:id', subreddotController.putSubreddot);
subreddotRouter.delete('/:id', subreddotController.deleteSubreddot);
subreddotRouter.post('/checkName', subreddotController.checkName);

module.exports = subreddotRouter;