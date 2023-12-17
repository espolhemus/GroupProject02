const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('books', {
        loggedIn: req.session.loggedIn,
        user_Id: req.session.userId,
        name: req.session.name

      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});





module.exports = router;