const router = require('express').Router();
const { Collection } = require('../../models');
const withAuth = require('../../utils/auth');


// Update a collection based on the choice to add to hasread or wantstoread lists and then redirect to their dashboard
router.put('/', async (req, res) => {

    try {
        var collectionData;
        if (req.body.collectionName == 'HasRead') {
            collectionData = await Collection.update({
                HasRead: true,
                WantsToRead: false,
            },
                {
                    where: {
                        UserID: req.session.user_id,
                        ISBN: req.body.Isbn
                    }
                })
        } else if (req.body.collectionName == 'WantsToRead') {
            collectionData = await Collection.update({
                HasRead: false,
                WantsToRead: true,
            },
                {
                    where: {
                        UserID: req.session.user_id,
                        ISBN: req.body.Isbn
                    }
                })
        }

        res.status(200).json(collectionData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Mark a book as hasread or wantstoread

router.post('/', async (req, res) => {
    try {
        const bookId = req.body.bookId;
        const choice = req.body.choice;

        if (choice == "hasRead") {
            const newCollection = await Collection.create({
                bookId: bookId,
                user_id: req.session.user_id,
                hasRead : true,
                dateAdded : Date.now()
            });
            res.status(200).json(newCollection);

        }else {
            const newCollection = await Collection.create({
                bookId: bookId,
                user_id: req.session.user_id,
                wantsToRead : true,
                dateAdded : Date.now()
            });
            res.status(200).json(newCollection);
        }

        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err);
    }
});

// This will be modified later if we decide to let users delete a created collection

router.delete('/:id', async (req, res) => {
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
