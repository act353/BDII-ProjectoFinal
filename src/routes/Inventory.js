const express = require('express');
const router = express.Router();

const {
  getEntries
} = require('../controllers/Inventory.js');

router.route('/entries')
  .get()
;
module.exports = router;
