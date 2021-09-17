function fetchUrls(repo) {
    repo.repositoryName = repo.repositoryName.replace(/[^a-zA-Z ]/g, '');

    $("#" + repo.repositoryName + "-loader").show();
    $("#" + repo.repositoryName + "-btn").prop('disabled', true);

    var promises = [];

    var p1 = new Promise(function (resolve, reject) {
        $.ajax({
            url: '/hn?q=' + repo.url,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
    promises.push(p1);

    var p2 = new Promise(function (resolve, reject) {
        $.ajax({
            url: '/reddit?q=' + repo.url,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
    promises.push(p2);


    Promise.all(promises).then(function (res) {
        var hn = $('#hn-' + repo.repositoryName);
        $.each(res[0], function (i, v) {
            hn.append("<li style='margin-bottom: 5px'><a class='repo-article' href=" + v + " target='_blank'>" + v + "</a><span class='text-gray text-muted' style='font-size: 10px'>Hacker News</span></li>");
        });

        var re = $('#reddit-' + repo.repositoryName);
        $.each(res[1], function (i, v) {
            re.append("<li style='margin-bottom: 5px'><a class='repo-article' href=" + v + " target='_blank'>" + v + "</a><span class='text-gray text-muted' style='font-size: 10px'>Reddit</span></li>");
        });

        $("#" + repo.repositoryName + "-loader").hide();
        $("#" + repo.repositoryName + "-btn").hide();
    }).catch(function (e) {
        console.log('Error occured', e);
        $("#" + repo.repositoryName + "-loader").hide();
        $("#" + repo.repositoryName + "-btn").hide();
    });
}