const { User } = require('../models');

module.exports = {
  getPage(req, res) {
    return User
      .findOne(
        { where: { id: req.params.id } },
      )
      .then((user) => res.status(200).send(user))
      .catch((error) => { req.status(400).send(error); });
  },
};
