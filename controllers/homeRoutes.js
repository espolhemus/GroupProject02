const router = require('express').Router();
const { Collection, User, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all User and show all of their collections and book data in each collection
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Collection,
          include: [{ model: Book }]
        },
      ],
    });

    // Serialize data so the template can read it
    const collection = userData.map((books) => books.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      ...collection,
      loggedIn: req.session.logged_in,
      user_Id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
