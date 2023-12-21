const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new review with 0 rating when a use adds a book to a collection
router.post('/', async (req, res) => {

    try {
        const reviewData = await Review.findOrCreate({
            where: { userId: req.session.user_id, bookIsbn: req.body[0] },
            defaults: {
                bookIsbn: req.body[0],
                userId: req.session.user_id,
            }
        });

        res.status(200).json(reviewData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update a review
router.put('/', async (req, res) => {

    try {
        const reviewData = await Review.update(
            {
                reviewScore: req.body.reviewScore
            },
            {
                where: {
                    bookIsbn: req.body.bookIsbn,
                    userId: req.session.user_id,
                }
            })

        res.status(200).json(reviewData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;
