const router = require('express').Router();
const { Collection, User, Review, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log('yo');
    // Show user collections and book data in each collection
    const collectionData = await Collection.findAll( {
       where: {
        userId : req.session.user_id
      },
      include: [
        {
          model: Book
        }
      ]
      });

    // Serialize data so the template can read it
    const collections = collectionData.map((collection) =>collection.get({ plain: true }));
    console.log(collections);
    // pull out the collections with hasread = true
    const hasRead = collections.filter(collection => {
      if(collection.hasRead){
        return true;
      }else{return false;}
    })    
    
    // pull out the collections with wantsToread = true
    const wantsToRead = collections.filter(collection => {
      if(collection.wantsToRead){
        return true;
      }else{
        return false;}
    })
    
 

    // Pass serialized data and session flag into template
    res.render('homepage', {
      hasRead : hasRead,
      wantsToRead : wantsToRead,
      logged_in: req.session.logged_in,
      user_Id: req.session.user_id,
      name: req.session.name
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in){
    res.redirect('/')
  }else {
    res.render('login');
  }
});

module.exports = router;
