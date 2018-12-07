const express = require('express');
const router = express.Router();

const {
  getProdToEntries,
  insertEntry,
  getEntries,
  insertMov,
  saveMov,
  cancelMov,
  deleteEntry
} = require('../controllers/Inventory.js');

router.route('/entries')
  .get(getProdToEntries)
  .post(insertEntry)
;

router.route('/:Mov/:id')
  .delete(deleteEntry)
;

router.route('/:Mov')
  .get(getEntries)
  .post(insertMov)
;

router.route('/save')
  .get(saveMov)
  .delete(cancelMov)
;
module.exports = router;
