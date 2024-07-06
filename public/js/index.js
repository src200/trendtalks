function fetchUrls(repo) {
    repo.repositoryName = repo.repositoryName.replace(/[^a-zA-Z ]/g, "");

    $(`#${repo.repositoryName}-loader`).show();
    $(`#${repo.repositoryName}-btn`).prop("disabled", true);

    const services = [
        { name: 'HackerNews', url: `/hn?q=${repo.url}` },
        { name: 'Reddit', url: `/reddit?q=${repo.url}` },
        { name: 'Stackoverflow', url: `/stackoverflow?q=${repo.url}` },
        { name: 'Dev.to', url: `/devto?q=${repo.url}` }
    ];

    const promises = services.map(service =>
        fetch(service.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => ({ name: service.name, data: data }))
            .catch(error => ({ reason: `${service.name} failed: ${error.message}` }))
    );

    Promise.allSettled(promises)
        .then((results) => {
            // biome-ignore lint/complexity/noForEach: <explanation>
            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    const serviceName = result.value.name;
                    const data = result.value.data;
                    const element = $(`#${serviceName}-${repo.repositoryName}`);

                    // biome-ignore lint/complexity/noForEach: <explanation>
                    data.forEach((v) => {
                        element.append(
                            `<li style='margin-bottom: 5px'>
                                <a class='repo-article' href="${v.link}" target='_blank'>${v.title}</a>
                                <span class='text-gray text-muted' style='font-size: 10px'>${serviceName}</span>
                            </li>`
                        );
                    });
                } else {
                    console.log(result.reason);
                }
            });

            $(`#${repo.repositoryName}-loader`).hide();
            $(`#${repo.repositoryName}-btn`).hide();
        })
        .catch((e) => {
            console.log("Error occurred", e);
            $(`#${repo.repositoryName}-loader`).hide();
            $(`#${repo.repositoryName}-btn`).hide();
        });
}