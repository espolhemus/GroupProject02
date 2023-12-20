const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    bookIsbn: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
    bookTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    bookAuthor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    bookGenre: {
        type: DataTypes.STRING,
        allowNull: true,
      },      
    bookPages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    bookImageUrl: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
    bookDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    publicationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    publisherName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    eBookUrl: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;