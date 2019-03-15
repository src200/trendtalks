var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();
var request = require('request');

// fetch trending repositories
router.get('/trending', function (req, res, next) {
    gt.fetchRepositories().then(function (repos) {
        var promises = [];
        repos.forEach(function (repo) {
            promises.push(searchHackerNews(repo))
        });
        
        Promise.all(promises).then(function (results) {
            res.send(results);
        }).catch(function (error) {
            res.send(error);
        })
    }, function (error) {
        res.send(error);
    });
});

// search hacker news
// return urls for found items
function searchHackerNews(repo) {
    return new Promise(function (resolve, reject) {
        request('http://hn.algolia.com/api/v1/search?query=' + repo.url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            console.log(response.nbHits);
            if (body.hits && body.hits.length > 0) {
                var hackerNewsUrls = [];
                body.hits.forEach(function (hit) {
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