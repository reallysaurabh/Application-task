var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
    keyword: String,
    author: String,
    title: String,
    description: String,
    publishedAt: Date,
    source: Object
});

module.exports = mongoose.model('News', NewsSchema);

