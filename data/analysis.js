const config = require("../config/config");
const Tweet = require("../models/Tweet");
const News = require("../models/News");
const Keywords = require("../models/Keywords");
const Sentiments = require("../models/Sentiment");
var async = require('async');
var axios = require('axios');

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: config.aylien.applicationId,
    application_key: config.aylien.applicationKey
});

// load mongoose package
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connectionString =  'mongodb://'+config.mongodb.username+':'+config.mongodb.password+'@'+
    config.mongodb.host+':'+config.mongodb.port+'/application-task';

// var connectionString = 'mongodb://localhost:27017/Application-task';
console.log(connectionString);


mongoose.connect(connectionString)
    .then(function(){
        console.log('connection succesful');
    })
    .catch(function(err){
        console.error(err);
    });


var docs = [];

Keywords.find(function (err, keywords) {

    if(err){
        console.log("Error fetching keywords from Mongodb");
    }else{

        async.forEach(keywords, function (key, callback) {


            var obj = {
                key: key.keyword,
                tweets: "",
                news: ""
            };
            Tweet.find({
                    $text: {
                        $search: key.keyword
                    }
                },
                {
                    text: 1,
                    score: {
                        $meta: "textScore"
                    }
                },
                function (err, tweets) {
                    if (err) {
                        console.log("Error fetching tweets", err)
                    } else {

                        tweets.forEach(function (tweet) {
                            obj.tweets = obj.tweets.concat(tweet.text)
                        });

                        News.find({
                                keyword: key.keyword
                            },
                            {
                                description: 1,
                                score: {
                                    $meta: "textScore"
                                }
                            }, function (err, news) {
                                if (err) {
                                    console.error("Error fetching news");
                                } else {
                                    news.forEach(function (newsOne) {
                                        obj.news = obj.news.concat(newsOne.description)
                                    });
                                    docs.push(obj);
                                    callback();
                                }
                            }).sort(
                            {score: {$meta: "textScore"}}
                        ).limit(20);


                    }
                })
                .sort(
                    {score: {$meta: "textScore"}}
                ).limit(20);


        }, function (call) {
            // console.log(docs);
            docs.forEach(function (doc) {
               if(doc.key.length>=3){

                   axios.all([
                       axios({
                           method: 'POST',
                           url: 'https://api.aylien.com/api/v1/sentiment',
                           headers: {
                               "X-AYLIEN-TextAPI-Application-Key": config.aylien.applicationKey,
                               "X-AYLIEN-TextAPI-Application-ID": config.aylien.applicationId
                           },
                           params: {
                               mode: 'document',
                               text : doc.tweets
                           }
                       }),
                       axios({
                           method: 'POST',
                           url: 'https://api.aylien.com/api/v1/sentiment',
                           headers: {
                               "X-AYLIEN-TextAPI-Application-Key": config.aylien.applicationKey,
                               "X-AYLIEN-TextAPI-Application-ID": config.aylien.applicationId
                           },
                           params: {
                               mode: 'document',
                               text : doc.news
                           }
                       })
                   ]).then(axios.spread(function (tweetS, newsS) {
                       console.log(tweetS);
                       console.log(newsS);
                       var obj = {
                         keyword: doc.key,
                         twitterPolarity: tweetS.data.polarity,
                         twitterPolarityConfidence: tweetS.data.polarity_confidence,
                         newsPolarity: newsS.data.polarity,
                         newsPolarityConfidence: newsS.data.polarity_confidence
                       };

                       console.log("Object: ", obj);

                       Sentiments.insertMany(obj, function (e, d) {
                           if(e){
                               console.log("Error inserting sentiments");
                           }else{
                               console.log(d);
                           }
                       });

                   })).catch(function (err) {
                       console.log("Error fetching sentiments");
                       console.log(err);
                   })


               }
            });

        });

    }

});

