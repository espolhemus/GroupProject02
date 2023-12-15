const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('freebooks', {
        loggedIn: req.session.loggedIn,
        user_Id: req.session.userId,
      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});





module.exports = router;