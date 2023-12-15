const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('search', {
        loggedIn: req.session.logged_in,
        user_Id: req.session.user_id,
      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });


module.exports = router;