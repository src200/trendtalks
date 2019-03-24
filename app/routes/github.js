var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();

// fetch trending repositories
router.get('/', function (req, res, next) {
    gt.fetchRepositories().then(function (repos) {
        // res.send(repos);
        res.render('index', { repos: repos });
    }, function (error) {
        res.send(error);
    });
});

module.exports = router;