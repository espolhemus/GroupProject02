const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const searchRoutes = require('./searchRoutes');
const freeBookRoutes = require('./freeBookRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/search', searchRoutes);
router.use('/books', freeBookRoutes);


module.exports = router;