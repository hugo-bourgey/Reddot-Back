const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String, required: false },
    postUser: { type: String, required: true },
    postSub: { type: String, required: true }
}, {timestamps: true});
const Post = mongoose.model('Posts', postSchema);
module.exports = Post;