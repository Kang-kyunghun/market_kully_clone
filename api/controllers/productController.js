const { productService } = require('../services');
const { catchAsync } = require('../utils/error');

const getProductList = catchAsync(async (req, res) => {
  const {
    categoryId,
    subCategoryId,
    minPrice = '0',
    maxPrice = '10000000',
    sortField,
    offset = '0',
    limit = '10',
  } = req.query;

  const result = await productService.getProductList(
    parseInt(categoryId),
    parseInt(subCategoryId),
    parseFloat(minPrice),
    parseFloat(maxPrice),
    sortField,
    parseInt(offset),
    parseInt(limit)
  );

  res.status(200).json({
    totalCount: result.totalCount,
    productList: result.productList,
  });
});

const getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await productService.getProduct(productId);

  res.status(200).json({ product });
});

module.exports = {
  getProductList,
  getProduct,
};
