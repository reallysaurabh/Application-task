var Twitter = require("twitter");
const config = require("../config/config");
const Tweet = require("../models/Tweet");

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

var client = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret
});


// You can also get the stream in a callback if you prefer.
client.stream('statuses/filter', {track: 'technology'}, function(stream) {
    stream.on('data', function(event) {
        Tweet.count(function (err, count) {
           if(err){
               console.error("Mongodb error");
           }else{
               console.log("No. of documents: " + count);
               if (count <= 10000){
                   if(event.lang === "en"){
                       var obj = {

                           createdAt: event.created_at,
                           tweetId: event.id,
                           text: event.text,
                           user: {
                               name: event.user.name,
                               screenName: event.user.screen_name,
                               location: event.user.location
                           },
                           hashtags: event.entities.hashtags,
                           place: event.place,
                           geo: event.geo,
                           coordinates: event.coordinates
                       };
                       Tweet.findOneAndUpdate({
                               tweetId: obj.tweetId
                           }, obj
                           ,{
                               upsert: true
                           }, function (erro, doc) {
                               if(erro){
                                   console.error("Insertion Error");
                                   console.error(erro);
                               }else{
                                   console.dir(doc)
                               }
                           });
                   }

               }
           }
        });
    });

    stream.on('error', function(error) {
        throw error;
    });
});