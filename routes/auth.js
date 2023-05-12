const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {
    name, surname, login, email, password,
  } = req.body;
  if (!(name || surname || email || login || password)) {
    return res.status(400).json({ message: 'This form can not be clean' });
  }
  const candidate = await User.findOne({ where: { login } });
  if (candidate !== null) {
    return res.status(400).json({ message: 'Try another login' });
  }

  User.create({
    name, surname, email, login, password,
  })
    .then((user) => {
      const payload = { id: user.id };
      const token = jwt.sign(payload, `${process.env.REACT_APP_SECRET}`);
      return res.json({ message: 'ok', token });
    });
  return res.status(200);
});

router.post('/signin', (req, res) => {
  const { login, password } = req.body;
  User.findOne({ where: { login } })
    .then((user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json({ message: 'wrong password' });
        const payload = { id: user.id };
        const token = jwt.sign(payload, `${process.env.REACT_APP_SECRET}`);
        return res.json({ user, token });
      });
    })
    .catch(() => {
      res.status(401).json({ message: 'no such user found' });
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'Success! You can not see this without a token', user: req.user,
  });
});

module.exports = router;
