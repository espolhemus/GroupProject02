const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collection extends Model { }

Collection.init(
  {
    collectionId: {
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
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    hasRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    wantsToRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'collection',
  }
);

module.exports = Collection;
