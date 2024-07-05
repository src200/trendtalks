// routes/devto.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const query = encodeURIComponent(req.query.q);
        const response = await axios.get(`https://dev.to/api/articles?per_page=5&search=${query}`);
        const articles = response.data.map(item => ({
            title: item.title,
            link: item.url
        }));
        res.json(articles);
    } catch (error) {
        console.error('Error fetching from Dev.to:', error);
        res.status(500).json({ error: 'Error fetching from Dev.to' });
    }
});

module.exports = router;