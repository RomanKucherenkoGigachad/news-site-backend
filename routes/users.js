const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/:id', userController.getPage);

module.exports = router;
