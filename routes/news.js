const express = require('express');

const router = express.Router();
const newsController = require('../controllers/news');

router.get('/', newsController.newsGet);
router.post('/', newsController.addPost);

module.exports = router;
