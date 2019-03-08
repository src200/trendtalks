var express = require('express');
var trending = require('github-trending');
var router = express.Router();

// fetch trending repositories
router.get('/trending', function (req, res, next) {
    trending('rust', function (err, repositories) {
        res.send(repositories);
    });
    // gt.fetchRepositories().then(function (res) {
    //     res.send(res);
    // }, function (error) {
    //     res.send(error);
    // });
});

module.exports = router;