var express = require('express');
var router = express.Router();
var request = require('request');
var randomUseragent = require('random-useragent');


router.get('/', function (req, res, next) {
    searchReddit(req.repo).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(error);
    });
});

// search reddit
function searchReddit(repo) {
    return new Promise(function (resolve, reject) {
        var options = {
            method: 'GET',
            url: 'https://api.reddit.com/search?q=' + repo.url,
            headers: {
                'User-Agent': randomUseragent.getRandom()
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            
            var _body = {}
            try {
                _body = JSON.parse(body);
            } catch (e) {
                
            }

            if (_body.data && _body.data.children && _body.data.children.length > 0) {
                var redditUrls = [];
                _body.data.children.forEach(function (hit) {
                    if (hit.data && hit.data.permalink) {
                        redditUrls.push('https://reddit.com/' + hit.data.permalink);
                    }                    
                });

                repo.redditUrls = redditUrls; 
                resolve(repo);
            } else {
                repo.redditUrls = [];
                resolve(repo);
            }
        });
    });
}

module.exports = router;