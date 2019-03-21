var express = require('express');
var router = express.Router();
var request = require('request');
var randomUseragent = require('random-useragent');


router.get('/', function (req, res, next) {
    searchReddit(req).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(error);
    });
});

// search reddit
function searchReddit(req) {
    return new Promise(function (resolve, reject) {
        var options = {
            method: 'GET',
            url: 'https://api.reddit.com/search?q=' + req.q,
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

            var redditUrls = [];
            if (_body.data && _body.data.children && _body.data.children.length > 0) {
                
                _body.data.children.forEach(function (hit) {
                    if (hit.data && hit.data.permalink) {
                        redditUrls.push('https://reddit.com/' + hit.data.permalink);
                    }                    
                });

                resolve(redditUrls);
            } else {
                resolve(redditUrls);
            }
        });
    });
}

module.exports = router;