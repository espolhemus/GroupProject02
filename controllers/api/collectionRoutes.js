const router = require('express').Router();
const { Collection } = require('../../models');
const withAuth = require('../../utils/auth');


// Update a collection based on the choice to add to hasread or wantstoread lists and then redirect to their dashboard
router.put('/', withAuth, async (req, res) => {
    
    try {
        var collectionData;
        if (req.body.collectionName == 'HasRead'){
            collectionData = await Collection.update({
                HasRead: true,
                WantsToRead: false,
            },
            {
                where: {
                    UserID : req.session.user_id,
                    ISBN : req.body.ISBN
                }
            })
        } else if (req.body.collectionName == 'WantsToRead'){
            collectionData = await Collection.update({
                HasRead: false,
                WantsToRead: true,
            },
            {
                where: {
                    UserID : req.session.user_id,
                    ISBN : req.body.ISBN
                }
            })
        }

        res.status(200).json(collectionData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// This will modified later if we decide to let the user make collections other than hasread of wantstoread

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ISBN : req.body.ISBN,

      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// This will be modified later if we decide to let users delete a created collection

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
