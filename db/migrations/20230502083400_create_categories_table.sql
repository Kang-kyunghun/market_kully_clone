-- migrate:up
CREATE TABLE categories (
  id INTEGER NTEGER PRIMARY KEY,
  name TEXT NOT NULL
  )
-- migrate:down
DROP TABLE categories;