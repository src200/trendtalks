var express = require('express');
var router = express.Router();
var request = require('request');
var randomUseragent = require('random-useragent');


router.get('/', function (req, res, next) {
    searchHackerNews(req.repo).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(error);
    });
});

// search hacker news
function searchHackerNews(repo) {
    return new Promise(function (resolve, reject) {
        request('https://hn.algolia.com/api/v1/search?query=' + repo.url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            
            var _body = {}
            try {
                _body = JSON.parse(body);
            } catch (e) {
                
            }

            if (_body.hits && _body.hits.length > 0) {
                var hackerNewsUrls = [];
                _body.hits.forEach(function (hit) {
                    var hnStory = 'https://news.ycombinator.com/item?id=' + hit.objectID;
                    hackerNewsUrls.push(hnStory);
                });

                repo.hnUrls = hackerNewsUrls; 
                resolve(repo);
            } else {
                repo.hnUrls = [];
                resolve(repo);
            }
        });
    });
}

module.exports = router;