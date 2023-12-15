const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collection extends Model {}

Collection.init(
  {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'userId',
        },
        primaryKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'book',
          key: 'bookId',
        },
        primaryKey: true,
      },  
    collectionName: {
      type: DataTypes.STRING,
      allowNull: false,
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
