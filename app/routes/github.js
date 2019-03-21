var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();
var request = require('request');
var randomUseragent = require('random-useragent');

// fetch trending repositories
router.get('/', function (req, res, next) {
    gt.fetchRepositories().then(function (repos) {
        res.render('index', { repos: repos });
    }, function (error) {
        res.send(error);
    });
});

module.exports = router;