const User = require('./User');
const Book = require('./Book');
const Collection = require('./Collection');
const Review = require('./Review');

// // We should decided whether we want to allow a user to have multiple 'collections'




User.hasMany(Collection, {foreignKey: 'user_id'})
Collection.belongsTo(User, {foreignKey: 'user_id'})

Book.hasMany(Collection, {foreignKey: 'book_isbn'})
Collection.belongsTo(Book, {foreignKey: 'book_isbn'})

User.hasMany(Review, {foreignKey:'user_id'})
Review.belongsTo(User, {foreignKey: 'user_id'})

Book.hasMany(Review, {foreignKey: 'book_isbn'})
Review.belongsTo(Book, {foreignKey: 'book_isbn'})

module.exports = { User, Book, Collection, Review };
