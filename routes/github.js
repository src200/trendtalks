const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

// fetch trending repositories
router.get("/", (req, res, next) => {
    console.log("Fetching repositories...");
    fetchTodaysTrendingRepositories()
        .then((repos) => {
            console.log("Repositories fetched:", repos);
            res.render("index", { repos: repos }, (err, html) => {
                if (err) {
                    console.error("Error rendering template:", err);
                    return res.status(500).send("Error rendering template");
                }
                res.send(html);
            });
        })
        .catch((error) => {
            console.error("Error fetching repositories:", error);
            res.status(500).render("error", {
                message: "An error occurred while fetching repositories",
            });
        });
});

async function fetchTodaysTrendingRepositories() {
    const url = "https://github.com/trending";

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const repos = [];

        $("article.Box-row").each((i, elem) => {
            const $elem = $(elem);
            const title = $elem.find("h2 a").text().trim().replace(/\s+/g, " ");
            const [username, repositoryName] = title
                .split("/")
                .map((item) => item.trim());

            const repo = {
                username,
                repositoryName,
                url: `https://github.com${$elem.find("h2 a").attr("href")}`,
                description: $elem.find("p.col-9").text().trim(),
                language: $elem
                    .find('span[itemprop="programmingLanguage"]')
                    .text()
                    .trim(),
                languageColor: $elem
                    .find(".repo-language-color")
                    .css("background-color"),
                totalStars: Number.parseInt(
                    $elem
                        .find(`a[href$="/${username}/${repositoryName}/stargazers"]`)
                        .text()
                        .trim()
                        .replace(",", "") || "0",
                ),
                forks: Number.parseInt(
                    $elem
                        .find(`a[href$="/${username}/${repositoryName}/forks"]`)
                        .text()
                        .trim()
                        .replace(",", "") || "0",
                ),
                builtBy: $elem
                    .find('span:contains("Built by")')
                    .find("a")
                    .map((i, el) => ({
                        username: $(el).attr("href").slice(1),
                        url: `https://github.com${$(el).attr("href")}`,
                        avatar: $(el).find("img").attr("src"),
                    }))
                    .get(),
            };

            repos.push(repo);
        });

        return repos;
    } catch (error) {
        console.error("Error fetching from GitHub Trending page:", error);
        throw error;
    }
}

module.exports = router;
