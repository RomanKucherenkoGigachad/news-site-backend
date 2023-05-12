/* eslint-disable camelcase */
const { News, User } = require('../models');

module.exports = {
  newsGet(req, res) {
    return News.findAll({
      order: [['id']],
      include: {
        model: User,
        attributes: ['login'],
      },
    }).then((news) => res.status(200).send(news));
  },

  addPost(req, res) {
    const {
      title, text, tags, user_id,
    } = req.body;
    News.create({
      title,
      text,
      tags,
      user_id,
    })
      .then((post) => News.findByPk(post.id, { include: [{ model: User }] }))
      .then((item) => res.send(item))
      .then(() => res.status(201));
  },
};
