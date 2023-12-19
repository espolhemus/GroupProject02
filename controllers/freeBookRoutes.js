const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const { genre } = req.query;

    try {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&filter=free-ebooks`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.render('books', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            name: req.session.name,
            books: data.items || [], // Pass the books data to the template
        });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
