var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();
var request = require('request');
var randomUseragent = require('random-useragent');

// fetch trending repositories
router.get('/trending', function (req, res, next) {
    gt.fetchRepositories().then(function (repos) {
        var promises = [];
        repos.forEach(function (repo) {
            promises.push(searchHackerNews(repo));
            promises.push(searchReddit(repo));
            promises.push(searchTwitter(repo));
        });
        
        Promise.all(promises).then(function (results) {
            // res.send(results);
            var temp = {};
            results.forEach(function (_res) {
                temp[_res.name] = _res;
            });

            var _tempRes = [];
            for (var key in temp) {
                _tempRes.push(temp[key])
            }


            res.send(_tempRes);
        }).catch(function (error) {
            res.send(error);
        })
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

// search twitter
function searchTwitter(repo) {
    return new Promise(function (resolve, reject) {
        var twitterUrl = []; 
        twitterUrl.push('https://twitter.com/search?src=typd&q=' + repo.url);
        repo.twitterUrls = twitterUrl;
        resolve(repo);
    });
}


module.exports = router;