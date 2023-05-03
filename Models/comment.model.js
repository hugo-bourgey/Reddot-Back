const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    content: { type: String, required: true },
    commentUser: { type: String, required: true },
    commentPost: { type: String, required: true }
}, {timestamps: true});
const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;