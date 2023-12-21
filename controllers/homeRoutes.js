const router = require('express').Router();
const { Collection, Review, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
   
    const collectionData = await Collection.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Book,
          include: [
            {
              model: Review,
              attributes: ['reviewScore', 'reviewId', 'userId'],
              where: { user_id: req.session.user_id }, // Filter reviews by user_id
              required: false,
            },
          ],
        },
      ],
    });
    
    // Serialize data so the template can read it
    const collections = collectionData.map((collection) => collection.get({ plain: true }));
   
    // pull out the collections with hasread = true
    const hasRead = collections.filter(collection => {
      if (collection.hasRead) {
        return true;
      } else { return false; }
    })
    
    // pull out the collections with wantsToread = true
    const wantsToRead = collections.filter(collection => {
      if (collection.wantsToRead) {
        return true;
      } else {
        return false;
      }
    })
    
    console.log('in home route');
    
    // Pass serialized data and session flag into template
    res.render('homepage', {
      hasRead: hasRead,
      wantsToRead: wantsToRead,
      logged_in: req.session.logged_in,
      user_Id: req.session.user_id,
      name: req.session.name
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If user logged in redirect to home else redirect to login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
  } else {
    res.render('login');
  }
});

module.exports = router;
