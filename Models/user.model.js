const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    mail: { type: String, required: true },
    pseudo: { type: String, required: true },
    password: { type: String, required: true },
    userPosts: { type: Array, required: false },
    userSubscribes: { type: Array, required: false },
    userUpvotes: { type: Array, required: false }
}, {timestamps: true});
const User = mongoose.model('Users', userSchema);
module.exports = User;
