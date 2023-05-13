const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'sqlite',
  database: './market_clone.db',
});

module.exports = dataSource;
