var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();
var cache = require('./cache');

// fetch trending repositories
router.get('/', function (req, res, next) {
    // check for cache
    cache.getTrendingRepos().then(function(value) {
        if (value) {
            res.render('index', { repos: value.repos });
        } else {
            fetchGitTrending();
        }
    }, function (err) {
        fetchGitTrending();
    });
});

function fetchGitTrending() {
    gt.fetchRepositories().then(function (_repos) {
        res.render('index', { repos: _repos });
    }, function (error) {
        res.send(error);
    }); 
}

module.exports = router;