// used for caching trending repos
var gt = require('@huchenme/github-trending');
var NodeCache = require("node-cache");

var appCache = new NodeCache({ stdTTL: 86400, checkperiod: 0 });

// define cache obj
var trendingRepos = { repos: [] };

function initialize() {
    // set cache obj
    gt.fetchRepositories().then(function (repos) {
        trendingRepos.repos = repos;
        appCache.set('TRENDING_REPOS', trendingRepos, function(err, success) {
            if(!err && success){
                console.log( success );
            }
        });
    }, function (error) {
        appCache.set('TRENDING_REPOS', trendingRepos);
    });
}

function getTrendingRepos(cb) {
    return new Promise(function (resolve, reject) {
        appCache.get('TRENDING_REPOS', function (err, value) {
            if (!err) {
                if (value == undefined) {
                    resolve(value);
                } else {
                    resolve(value);
                }
            } else {
                reject(err);
            }
        }) 
    });
    
}

module.exports = {
    initialize: initialize,
    getTrendingRepos: getTrendingRepos
}

