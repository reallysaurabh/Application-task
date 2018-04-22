var mongoose = require("mongoose");

var SentimentSchema = new mongoose.Schema({
    keyword: String,
    twitterPolarity: String,
    twitterPolarityConfidence: Number,
    newsPolarity: String,
    newsPolarityConfidence: Number
});

module.exports = mongoose.model('Sentiment', SentimentSchema);

