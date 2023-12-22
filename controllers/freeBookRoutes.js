const router = require('express').Router();
const { Collection, User, Review, Book } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', withAuth, async (req, res) => {
    const { genre } = req.query;
    const genres = genre ? genre.split(',') : []; // Split the genre string into an array
    const apiKey = process.env.API_KEY;
    try {
      // Use genres array to construct the API URL
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${genres.map(g => `subject:${g}`).join('+')}&filter=free-ebooks&key=${apiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      const {items} = data;

      
      res.render('books', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        name: req.session.name,
        books: data.items || [],
      });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;

