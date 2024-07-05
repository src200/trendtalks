// routes/stackoverflow.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const query = encodeURIComponent(req.query.q);
        const response = await axios.get(`https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${query}&site=stackoverflow`);
        const questions = response.data.items.slice(0, 5).map(item => ({
            title: item.title,
            link: item.link
        }));
        res.json(questions);
    } catch (error) {
        console.error('Error fetching from Stack Overflow:', error);
        res.status(500).json({ error: 'Error fetching from Stack Overflow' });
    }
});

module.exports = router;