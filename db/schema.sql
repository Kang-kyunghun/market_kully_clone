CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(255) primary key);
CREATE TABLE categories (
  id INTEGER NTEGER PRIMARY KEY,
  name TEXT NOT NULL
  );
CREATE TABLE sub_categories (
  id INTEGER NTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
  );
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
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20230502083400'),
  ('20230502083405'),
  ('20230502083415');
