var express = require('express');
var request = require('request');
var router = express.Router();

// fetch trending repositories
router.get('/', function (req, res, next) {
    fetchTrendingRepositories().then(function (_repos) {
        res.render('index', { repos: _repos });
    }, function (error) {
        res.send(error);
    });
});

function fetchTrendingRepositories(req) {
    return new Promise(function (resolve, reject) {
        request('https://gh-trending-api.herokuapp.com/repositories', function (error, response, body) {
            if (error) {
                reject(error);
            }

            var _body = {}
            try {
                _body = JSON.parse(body);
                resolve(_body);
            } catch (e) {
                reject(e);
            }
        });
    });
}

module.exports = router;