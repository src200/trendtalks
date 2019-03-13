var express = require('express');
var gt = require('@huchenme/github-trending');
var router = express.Router();
var request = require('request');

// fetch trending repositories
router.get('/trending', function (req, res, next) {
    gt.fetchRepositories().then(function (repos) {
        var promises = [];
        repos.forEach(function (repo) {
            promises.push(createPromise(repo))
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

function createPromise(repo) {
    return new Promise(function (resolve, reject) {
        request('https://www.googleapis.com/customsearch/v1?key=AIzaSyDSS2JNP1_vB-pjThvbVGD7YUC_Ns7S0t4&cx=003147681764474438121:j7-pcqku6gg&q=' + repo.name + ' ' + repo.author, function (error, response, body) {
            try {
                var parsedBody = JSON.parse(body);
                if (parsedBody.error) { 
                    reject(body.error);
                } else {
                    resolve({ repo_url: repo.url, repo_query: repo.name + ' ' + repo.author, google_result: parsedBody });              
                }
            } catch (error) {
                reject(error);
            }
        });
    });
   
}

module.exports = router;