var express = require('express');
var router = express.Router();
const config = require('../config/config.json');
var async = require('async');

var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret
});

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.newsapi.apiKey);

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: config.aylien.applicationId,
    application_key: config.aylien.applicationKey
});


/* GET home page. */
router.post('/tweet/:keyword', function(req, res) {
    var keyword = req.params.keyword;

    var twitterData = [];

    client.get('search/tweets', {q: keyword, count: 5}, function(error, tweets, response) {
        if(error){
            console.log(error);
            res.send({
                success: false,
                message: "Error fetching tweets"
            });
        }else{

            async.forEach(tweets.statuses, function (tweet, callback){
                textapi.sentiment({
                    'text': tweet.text
                }, function(error, resp) {
                    if(error){
                        console.log(error);
                    }else{
                        twitterData.push(resp);
                    }
                    callback();
                });
            }, function (call) {
                res.send({
                    success: true,
                    twitterData: twitterData
                });
            });

        }
    });
});

router.post('/news/:keyword', function (req, res) {

    var keyword = req.params.keyword;
    var newsData = [];

    newsapi.v2.everything({
        q: keyword,
        language: 'en',
        sortBy: 'relevancy'
    }).then(function(response) {

        var newsArticles = response.articles.slice(0, 6);
        async.forEach(newsArticles, function (news, callback){
            textapi.sentiment({
                'text': news.description
            }, function(error, resp) {
                if(error){
                    console.error(error);
                }else{
                    newsData.push(resp);
                }
                callback();
            });
        }, function (call) {
            res.send({
                success: true,
                newsData: newsData
            });
        });

    }).catch(function (err) {
        console.error(err);
        res.send({
            success: false,
            message: "Error fetching news"
        })
    });

});

module.exports = router;