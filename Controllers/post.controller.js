const post = require('../Models/post.model');

function getAllPosts(req, res) {
    post.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(400).json(err));
}

function getPostById(req, res) {
    post.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Post not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function getPostsBySubId(req, res) {
    post.find({postSub: req.params.postSub})
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('No posts for this sub');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function postPost(req, res) {
    if (!req.body.title) {
        return res.status(400).send('Title is required');
    }
    const newPost = new post({
        title: req.body.title,
        content: req.body.content,
        media: req.body.media,
        postUser: req.body.postUser,
        postSub: req.body.postSub
    });
    newPost.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(500).json(err));
}

function putPost(req, res) {
    if (!req.body.title) {
        return res.status(400).send('Title is required');
    }
    post.findOneAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content,
        media: req.body.media,
        postUser: req.body.postUser,
        postSub: req.body.postSub
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).json(err);
        });
}

function deletePost(req, res) {
    post.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {res.status(500).json(err)});
}


module.exports = { getAllPosts, getPostById, postPost, putPost, deletePost, getPostsBySubId };