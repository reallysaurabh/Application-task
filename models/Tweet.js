var mongoose = require("mongoose");

var TweetSchema = new mongoose.Schema({
    createdAt: Date,
    tweetId: Number,
    text: String,
    user: {
        name: String,
        screenName: String,
        location: String
    },
    hashtags: Array,
    place: Object,
    geo: Object,
    coordinates: Object
});

module.exports = mongoose.model('Tweet', TweetSchema);
