var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();

// fetch trending repositories
router.get('/trending', function (req, res, next) {
    gt.fetchRepositories().then(function (repos) {
        var reposList = [];
        repos.forEach(function (repo) {
            reposList.push({ url: repo.url, query: repo.name + ' ' + repo.author });
        });
        res.render('index', { reposList: reposList });
    }, function (error) {
        res.send(error);
    });
});

module.exports = router;