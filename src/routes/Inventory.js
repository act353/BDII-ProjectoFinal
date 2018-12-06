const express = require('express');
const router = express.Router();

const {
  getProdToEntries,
  insertEntry,
  getEntries,
  insertMov
} = require('../controllers/Inventory.js');

router.route('/entries')
  .get(getProdToEntries)
  .post(insertEntry)
;

router.route('/:Mov')
  .get(getEntries)
  .post(insertMov)
;
module.exports = router;
