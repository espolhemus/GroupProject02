const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    bookIdId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: false,
      },      
    bookPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    bookISBN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    bookImageURL: {
        type: DataTypes.CHAR,
        allowNull: true,
      },
    bookDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    publicationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    publisherName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    eBookURL: {
        type: DataTypes.CHAR,
        allowNull: true,
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