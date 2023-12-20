const router = require('express').Router();
const { Collection, User, Review, Book } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const { genre, APIkey } = req.query;
    const genres = genre ? genre.split(',') : [];

    try {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${genres.map(g => `subject:${g}`).join('+')}&filter=free-ebooks&key=${APIkey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Set Content-Type to JSON
        res.setHeader('Content-Type', 'application/json');

        res.json({ books: data.items || [] });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;

