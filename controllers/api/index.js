const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require('./collectionRoutes')
const reviewRoutes = require('./reviewRoutes')
router.use('/users', userRoutes);
router.use('/collection', collectionRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
