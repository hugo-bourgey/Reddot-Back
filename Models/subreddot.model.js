const mongoose = require('mongoose');
const subreddotSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    subPosts: { type: Array, required: false },
    subscribers: { type: Array, required: false }
}, {timestamps: true});
const Subreddot = mongoose.model('Subreddots', subreddotSchema);
module.exports = Subreddot;