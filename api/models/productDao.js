const dataSource = require('../../db/dataSource');

const getTotalProduct = async (
  categoryId,
  subCategoryId,
  minPrice,
  maxPrice
) => {
  try {
    const conditionArr = [`p.price BETWEEN ${minPrice} AND ${maxPrice}`];

    if (categoryId) conditionArr.push(`sc.category_id = ${categoryId}`);

    if (subCategoryId)
      conditionArr.push(`p.sub_category_id = ${subCategoryId}`);

    const whereCondition = `WHERE` + ` ` + conditionArr.join(' AND ');

    const [result] = await dataSource.query(
      `
        SELECT
          COUNT(p.id) as totalCount
        FROM products p
        JOIN sub_categories sc ON sc.id = p.sub_category_id
        JOIN categories c ON c.id = sc.category_id
        ${whereCondition}
     `
    );

    return result.totalCount;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};
const getProductList = async (
  categoryId,
  subCategoryId,
  minPrice,
  maxPrice,
  sortField,
  offset,
  limit
) => {
  try {
    let orderBy;
    const conditionArr = [`p.price BETWEEN ${minPrice} AND ${maxPrice}`];

    if (categoryId) conditionArr.push(`sc.category_id = ${categoryId}`);

    if (subCategoryId)
      conditionArr.push(`p.sub_category_id = ${subCategoryId}`);

    switch (sortField) {
      case 'new':
        orderBy = 'ORDER BY created_at DESC ';
        break;
      case 'priceAsc':
        orderBy = 'ORDER BY p.price ASC ';
        break;
      case 'priceDesc':
        orderBy = 'ORDER BY p.price DESC ';
        break;
      default:
        orderBy = 'ORDER BY p.id DESC ';
    }

    const whereCondition = `WHERE` + ` ` + conditionArr.join(' AND ') + ` `;

    return dataSource.query(
      `
        SELECT
          p.id,
          p.name,
          p.description,
          p.detail,
          p.price,
          p.thumbnail,
          sc.name AS subCategory,
          c.name AS category
        FROM products p
        JOIN sub_categories sc ON sc.id = p.sub_category_id
        JOIN categories c ON c.id = sc.category_id
        ${whereCondition}
        ${orderBy}
        LIMIT ? OFFSET ?
     `,
      [limit, offset]
    );
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getProduct = async (productId) => {
  try {
    const [product] = await dataSource.query(
      `
        SELECT
          p.id,
          p.name,
          p.description,
          p.detail,
          p.price,
          p.thumbnail,
          sc.subCategoryName,
          c.categoryName
        FROM products p
        JOIN sub_categories sc ON sc.id = p.sub_category_id
        JOIN categories c ON c.id = sc.category_id
        WHERE p.id = ?
     `,
      [productId]
    );

    return product;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getCategory = async (categoryId) => {
  try {
    const [category] = await dataSource.query(
      `
      SELECT
        c.id,
        c.name
      FROM categories c
      WHERE c.id = ?
     `,
      [categoryId]
    );

    return category;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getSubCategoryByCategoryId = async (categoryId) => {
  try {
    const subCategories = await dataSource.query(
      `
      SELECT
        sc.id,
        sc.name
      FROM sub_categories sc
      WHERE sc.category_id = ?
      ORDER BY sc.id 
     `,
      [categoryId]
    );

    return subCategories;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getTotalProduct,
  getProductList,
  getProduct,
  getCategory,
  getSubCategoryByCategoryId,
};
