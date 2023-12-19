// Example backend route
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Use 'node-fetch' to make HTTP requests in Node.js

router.get('/search', async(req, res) => {
    const { query } = req.query;

    try {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Handle the data and send it back to the frontend
        res.json(data);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;