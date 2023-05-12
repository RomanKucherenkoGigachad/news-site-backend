const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const { User } = require('./models');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = `${process.env.REACT_APP_SECRET}`;

// eslint-disable-next-line camelcase
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  User.findByPk(jwt_payload.id)
    .then((user) => {
      next(null, user);
    })
    .catch(() => {
      next(null, false);
    });
});

passport.use(strategy);

const app = express();
app.use(passport.initialize());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST'],
  }),
);

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/news', newsRouter);
app.use('/auth', authRouter);

module.exports = app;
