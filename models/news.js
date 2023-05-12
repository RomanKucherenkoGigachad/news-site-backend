const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {}
  News.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    picture: DataTypes.STRING,
    text: DataTypes.STRING,
    tags: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  News.associate = function (models) {
    News.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return News;
};
