const bcrypt = require('bcrypt');

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {}
  }
  User.init({
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    login: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function (models) {
    User.hasMany(models.News, {
      foreignKey: 'user_id',
    });
  };
  User.beforeSave(async (user) => {
    const currentUser = user;
    if (currentUser.changed('password')) {
      currentUser.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10), null);
    }
    return currentUser;
  });
  User.prototype.comparePassword = function comparePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  };

  User.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };

  return User;
};
