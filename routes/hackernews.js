var express = require('express');
var router = express.Router();
var request = require('request');
var randomUseragent = require('random-useragent');


router.get('/', function (req, res, next) {
    searchHackerNews(req).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(error);
    });
});

// search hacker news
function searchHackerNews(req) {
    return new Promise(function (resolve, reject) {
        request('https://hn.algolia.com/api/v1/search?query=' + req.query.q + '&tags=story', function (error, response, body) {
            if (error) {
                reject(error);
            }
            
            var _body = {}
            try {
                _body = JSON.parse(body);
            } catch (e) {
                
            }

            var hackerNewsUrls = [];
            if (_body.hits && _body.hits.length > 0) {
                
                _body.hits.forEach(function (hit) {
                    var hnStory = 'https://news.ycombinator.com/item?id=' + hit.objectID;
                    hackerNewsUrls.push(hnStory);
                });

                resolve(hackerNewsUrls);
            } else {
                resolve(hackerNewsUrls);
            }
        });
    });
}

module.exports = router;