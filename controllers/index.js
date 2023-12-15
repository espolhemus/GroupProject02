const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const searchRoutes = require('./searchRoutes');
const freeBookRoutes = require('./freeBookRoutes');
const bookRoutes = require('./bookRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/search', searchRoutes);
router.use('/freebooks', freeBookRoutes);
router.use('/books', bookRoutes);

module.exports = router;