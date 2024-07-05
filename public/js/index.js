function fetchUrls(repo) {
    repo.repositoryName = repo.repositoryName.replace(/[^a-zA-Z ]/g, "");

    $("#" + repo.repositoryName + "-loader").show();
    $("#" + repo.repositoryName + "-btn").prop("disabled", true);

    var promises = [];

    var hn = new Promise((resolve, reject) => {
        $.ajax({
            url: "/hn?q=" + repo.url,
            success: (data) => {
                resolve(data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
    promises.push(hn);

    var reddit = new Promise((resolve, reject) => {
        $.ajax({
            url: "/reddit?q=" + repo.url,
            success: (data) => {
                resolve(data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
    promises.push(reddit);

    var stackoverflow = new Promise((resolve, reject) => {
        $.ajax({
            url: "/stackoverflow?q=" + repo.url,
            success: (data) => {
                resolve(data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
    promises.push(stackoverflow);

    var devto = new Promise((resolve, reject) => {
        $.ajax({
            url: "/devto?q=" + repo.url,
            success: (data) => {
                resolve(data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
    promises.push(devto);

    Promise.all(promises)
        .then((res) => {
            var hn = $("#hn-" + repo.repositoryName);
            $.each(res[0], (i, v) => {
                hn.append(
                    "<li style='margin-bottom: 5px'><a class='repo-article' href=" +
                    v.link +
                    " target='_blank'>" +
                    v.title +
                    "</a><span class='text-gray text-muted' style='font-size: 10px'>Hacker News</span></li>",
                );
            });

            var re = $("#reddit-" + repo.repositoryName);
            $.each(res[1], (i, v) => {
                re.append(
                    "<li style='margin-bottom: 5px'><a class='repo-article' href=" +
                    v.link +
                    " target='_blank'>" +
                    v.title +
                    "</a><span class='text-gray text-muted' style='font-size: 10px'>Reddit</span></li>",
                );
            });

            var stackoverflow = $("#stackoverflow-" + repo.repositoryName);
            $.each(res[2], (i, v) => {
                stackoverflow.append(
                    "<li style='margin-bottom: 5px'><a class='repo-article' href=" +
                    v.link +
                    " target='_blank'>" +
                    v.title +
                    "</a><span class='text-gray text-muted' style='font-size: 10px'>Stack Overflow</span></li>",
                );
            });

            var devto = $("#devto-" + repo.repositoryName);
            $.each(res[3], (i, v) => {
                devto.append(
                    "<li style='margin-bottom: 5px'><a class='repo-article' href=" +
                    v.link +
                    " target='_blank'>" +
                    v.title +
                    "</a><span class='text-gray text-muted' style='font-size: 10px'>Dev.to</span></li>",
                );
            });


            $("#" + repo.repositoryName + "-loader").hide();
            $("#" + repo.repositoryName + "-btn").hide();
        })
        .catch((e) => {
            console.log("Error occured", e);
            $("#" + repo.repositoryName + "-loader").hide();
            $("#" + repo.repositoryName + "-btn").hide();
        });
}
