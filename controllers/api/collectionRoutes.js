const router = require('express').Router();
const { Collection } = require('../../models');
const withAuth = require('../../utils/auth');




// Mark a book as hasread or wantstoread

router.post('/', withAuth, async (req, res) => {
    try {

        const bookIsbn = req.body[0];
        if (req.body[1]) {
            const newCollection = await Collection.findOrCreate({
                where: { userId: req.session.user_id, bookIsbn: bookIsbn },
                defaults: {
                    bookIsbn: bookIsbn,
                    userId: req.session.user_id,
                    hasRead: 1,
                    wantsToRead: 0,
                }
            });
            res.status(200).json(newCollection);

        } else {
            const newCollection = await Collection.findOrCreate({
                where: { userId: req.session.user_id, bookIsbn: bookIsbn },
                defaults: {
                    bookIsbn: bookIsbn,
                    user_id: req.session.user_id,
                    wantsToRead: 1,
                    hasRead: 0,

                }
            });
            res.status(200).json(newCollection);
        }


    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;
