const comment = require('../Models/comment.model');

function getAllComments(req, res) {
    comment.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(400).json(err));
}

function getCommentById(req, res) {
    comment.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Comment not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function getCommentsByPostId(req, res) {
    comment.find({commentPost: req.params.commentPost})
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Comment not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function postComment(req, res) {
    if (!req.body.content) {
        return res.status(400).send('Content is required');
    }
    const newComment = new comment({
        content: req.body.content,
        commentUser: req.body.commentUser,
        commentPost: req.body.commentPost,
        parent: req.body.parent
    });
    newComment.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(500).json(err));
}

function putComment(req, res) {
    if (!req.body.content) {
        return res.status(400).send('Content is required');
    }
    comment.findOneAndUpdate({ _id: req.params.id }, {
        content: req.body.content,
        commentUser: req.body.commentUser,
        commentPost: req.body.commentPost
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).json(err);
        });
}

function deleteComment(req, res) {
    comment.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(400).json(err));
}

function getParent(req, res) {
    comment.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result.parent);
            } else {
                res.status(404).send('Comment not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function getCommentsByParentId(req, res) {
    comment.find({parent: req.params.parent})
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Comment not found');
            }
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
}

module.exports = { getAllComments, getCommentById, getCommentsByPostId, postComment, putComment, deleteComment, getParent, getCommentsByParentId };