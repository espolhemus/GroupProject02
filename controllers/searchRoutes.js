const router = require('express').Router();
const withAuth = require('../utils/auth');
require('dotenv').config();


router.get('/', withAuth, async (req, res) => {
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

  // fetch books from google books api
router.post('/', withAuth, async (req,res) => {
  var url = req.body.apiURL;
  url += process.env.API_KEY;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  res.status(200).json(await response.json());

})
module.exports = router;