const mongoose = require('mongoose');
const mediaSchema = mongoose.Schema({
    url: { type: String, required: true }
}, {timestamps: true});
const Media = mongoose.model('Medias', mediaSchema);
module.exports = Media;