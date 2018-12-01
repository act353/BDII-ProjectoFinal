const express = require('express');
const router = express.Router();

const {
  getUser
} = require('../controllers/User');

router.route('/')
  .post(getUser)
;

module.exports = router;
