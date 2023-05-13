-- migrate:up
CREATE TABLE products (
  id INTEGER NTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  detail TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  price REAL NOT NULL,
  sub_category_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id)
)
-- migrate:down
DROP TABLE books;