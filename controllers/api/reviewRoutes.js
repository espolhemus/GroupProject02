const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');




 // For retrieving data for a review
router.get('/', withAuth, async (req,res) => {
    try{
        const reviewData = await Review.findOne({where: {ReviewID : req.body.reviewId}})
        res.status(200).json(reviewData);

    } catch {
        res.status(400).json(err);

    }
})


// Create a new review for a specific book
router.post('/', withAuth, async (req, res) => {

    try {

        const reviewData = await Review.create({
            BookID: req.body.ISBN,
            UserID: req.session.user_id,
            ReviewScore: req.body.score,
            ReviewDate: Date.now(),
            ReviewText: req.body.text
        })

        res.status(200).json(reviewData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// This will be modified later if we decide to let users delete a review
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
