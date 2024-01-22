CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  password VARCHAR(200),
  email VARCHAR(100) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  google_id VARCHAR(100),
  roles CHAR[] NOT NULL,
  address VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  created_at timestamp
);

CREATE TABLE products (
   product_id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   slug VARCHAR(100) NOT NULL,
   price real NOT NULL,
   description text NOT NULL,
   image_url VARCHAR
);

CREATE TABLE orders (
   order_id SERIAL PRIMARY KEY,
   user_id integer NOT NULL,
   status VARCHAR(20) NOT NULL,
   date timestamp NOT NULL,
   amount real,
   total integer,
   ref VARCHAR(100)
);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (user_id);


CREATE TABLE cart (
   cart_id SERIAL PRIMARY KEY,
   user_id integer
);

ALTER TABLE cart ADD FOREIGN KEY (user_id) REFERENCES users (user_id);


CREATE TABLE cart_item (
   cart_item_id SERIAL PRIMARY KEY,
   cart_id integer NOT NULL,
   product_id integer NOT NULL,
   quantity integer NOT NULL
);

CREATE TABLE order_item (
  order_item_id SERIAL PRIMARY KEY,
  order_id integer NOT NULL,
  product_id integer NOT NULL,
  quantity integer NOT NULL
);

ALTER TABLE order_item ADD FOREIGN KEY (order_id) REFERENCES orders (order_id);

ALTER TABLE order_item ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

ALTER TABLE cart_item ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
  product_id integer NOT NULL,
  user_id integer NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL,
  date date NOT NULL,
);

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (product_id);

ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
