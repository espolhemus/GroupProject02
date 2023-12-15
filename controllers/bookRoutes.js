const router = require('express').Router();
const { Book } = require('../models');
const withAuth = require('../utils/auth');


// User clicks a book on one of their collections. Retrieves the data for clicked book and redirects them to the "Display a single book" handlebars file
router.get('/:ISBN', async (req, res) => {
    try {
      const bookData = await Book.findByPk(req.params.ISBN, {
      });
  
      const book = bookData.map(book => book.get({ plain: true }));
  
      res.render('book', {
        ...book,
        loggedIn: req.session.logged_in,
        user_Id: req.session.user_id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;