const User = require('./User');
const Book = require('./Book');
const Collection = require('./Collection');
const Review = require('./Review');

// // We should decided whether we want to allow a user to have multiple 'collections'

// // One-to-one relationship
// User.hasOne(Collection, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

// // One-to-one relationhship
// Collection.belongsTo(User, {
//   foreignKey: 'userId'
// });

// // One-to-many relationship
// User.hasMany(Review, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

// // Many-to-one relationship
// Review.belongsTo(User, {
//   foreignKey: 'userId'
// });

// // One-to-many relationship
// Collection.hasMany(Book, {
//   foreignKey: 'bookId',
//   onDelete: 'CASCADE'
// });

// // Many-to-one relationship
// Review.belongsTo(User, {
//   foreignKey: 'userId'
// });

User.belongsToMany(Book, { through: Collection, foreignKey : "user_id"})
Book.belongsToMany(User, { through: Collection, foreignKey: "book_id"})

User.belongsToMany(Book, {through: Review,foreignKey : "user_id"})
Book.belongsToMany(User, { through: Review,foreignKey: "book_id"})
module.exports = { User, Book, Collection, Review };
