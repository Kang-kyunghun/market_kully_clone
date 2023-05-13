const { productDao } = require('../models');

const getProductList = async (
  categoryId,
  subCategoryId,
  minPrice,
  maxPrice,
  sortField,
  offset,
  limit
) => {
  const totalCount = await productDao.getTotalProduct(
    categoryId,
    subCategoryId,
    minPrice,
    maxPrice
  );
  const productList = await productDao.getProductList(
    categoryId,
    subCategoryId,
    minPrice,
    maxPrice,
    sortField,
    offset,
    limit
  );
  return { totalCount, productList };
};

const getProduct = async (productId) => {
  const product = await productDao.getProduct(productId);

  if (!product) {
    const err = new Error('PRODUCT_DOES_NOT_EXIST');
    err.statusCode = 404;

    throw err;
  }

  return product;
};

const getCategory = async (categoryId) => {
  const category = await productDao.getCategory(categoryId);

  if (!category) {
    const err = new Error('CATEGORY_DOES_NOT_EXIST');
    err.statusCode = 404;

    throw err;
  }

  const subCategories = await productDao.getSubCategoryByCategoryId(categoryId);
  category.subCategories = subCategories;

  return category;
};

module.exports = {
  getProductList,
  getProduct,
  getCategory,
};
