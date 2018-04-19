var express = require('express');
var router = express.Router();
const Tweet = require("../models/Tweet");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ngTodo' });
});

router.get('/categorize', function (req, res) {

    Tweet.find({},{
        "hashtags.text": 1
    }, function (err, docs) {
        if(err){
            console.error(err);
            res.send({
               success: false,
               message: "Mongodb error"
            });
        }else{
            res.send({
                success: true,
                message: docs
            })
        }
    })

});

module.exports = router;