const express = require('express');

const { productController } = require('../controllers');
const router = express.Router();

router.get('', productController.getProductList);
router.get('/:productId', productController.getProduct);

module.exports = router;