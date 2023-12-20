const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        
        const info = req.body;
        
        const bookData = await Book.create({
            bookIsbn: info[0],
            bookTitle: info[1],
            bookAuthor: info[2],
            bookDescription: info[3],
            eBookUrl: info[4],
            bookImageUrl: info[5],
            publisherName: info[6],
            bookPages: info[7],
            publicationDate: info[8]
        });
        res.status(200).json(bookData);

    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router;