const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('search', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        name: req.session.name

      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });


module.exports = router;