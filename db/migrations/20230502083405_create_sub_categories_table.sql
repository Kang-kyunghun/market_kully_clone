-- migrate:up
CREATE TABLE sub_categories (
  id INTEGER NTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
  )
-- migrate:down
DROP TABLE sub_categories;