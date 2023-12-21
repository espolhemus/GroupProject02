const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'userId',
        },
      },
    bookIsbn: {
        type: DataTypes.STRING,
        references: {
          model: 'book',
          key: 'bookIsbn',
        },
      },  
    reviewScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    dateAdded: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;