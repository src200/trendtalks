var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    searchTwitter(req.repo).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(error);     
    });
});

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