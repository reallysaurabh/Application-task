var mongoose = require("mongoose");

var KeywordsSchema = new mongoose.Schema({
    keyword: String
});

module.exports = mongoose.model('Keywords', KeywordsSchema);