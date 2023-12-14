const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    try {
      res.render('search', {
        loggedIn: req.session.loggedIn,
        user_Id: req.session.userId,
      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });

router.post('/:searchCriteria', withAuth, async (req,res) => {
    
})



module.exports = router;