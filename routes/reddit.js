const express = require("express");
const router = express.Router();
const axios = require("axios");
const randomUseragent = require("random-useragent");

router.get("/", async (req, res) => {
    try {
        const result = await searchReddit(req);
        res.json(result);
    } catch (error) {
        console.error("Error searching Reddit:", error);
        res.status(500).json({ error: "Error searching Reddit" });
    }
});

// search reddit
async function searchReddit(req) {
    const options = {
        method: "GET",
        url: `https://api.reddit.com/search?q=${encodeURIComponent(req.query.q)}`,
        headers: {
            "User-Agent": randomUseragent.getRandom(),
        },
    };

    try {
        const response = await axios(options);
        const redditResults = [];

        if (
            response.data.data &&
            response.data.data.children &&
            response.data.data.children.length > 0
        ) {
            response.data.data.children.forEach((hit) => {
                if (hit.data && hit.data.permalink) {
                    redditResults.push({
                        title: hit.data.title,
                        link: "https://reddit.com" + hit.data.permalink,
                    });
                }
            });
        }

        return redditResults;
    } catch (error) {
        console.error("Error fetching from Reddit API:", error);
        throw error;
    }
}

module.exports = router;
