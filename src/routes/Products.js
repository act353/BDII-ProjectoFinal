const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  getProductsByName,
  updateProduct,
  insertProduct
}  = require('../controllers/Products.js');

router.route('/')
  .post(insertProduct)
;

router.route('/:all')
  .get(getProducts)
;

router.route('/findName/:prod/:usless')
  .get(getProductsByName)
;

router.route('/findId/:id')
  .get(getProductById)
  .put(updateProduct)
;

module.exports = router;
