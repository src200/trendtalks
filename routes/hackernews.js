const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const result = await searchHackerNews(req);
        res.json(result);
    } catch (error) {
        console.error('Error searching Hacker News:', error);
        res.status(500).json({ error: 'Error searching Hacker News' });
    }
});

// search hacker news
async function searchHackerNews(req) {
    try {
        const query = encodeURIComponent(req.query.q);
        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&tags=story`);

        const hackerNewsResults = [];
        if (response.data.hits && response.data.hits.length > 0) {
            response.data.hits.forEach((hit) => {
                hackerNewsResults.push({
                    title: hit.title,
                    link: `https://news.ycombinator.com/item?id=${hit.objectID}`
                });
            });
        }

        return hackerNewsResults;
    } catch (error) {
        console.error('Error fetching from Hacker News API:', error);
        throw error;
    }
}

module.exports = router;