const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LinkSchema = new Schema({
    url: { type: String, required: true, trim: true },
    shortUrl: { type: String, required: true, trim: true }
}, { timestamps: true });
var Link = mongoose.model('Link', LinkSchema)
module.exports = Link;