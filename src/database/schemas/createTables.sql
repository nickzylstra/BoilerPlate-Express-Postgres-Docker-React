CREATE TABLE IF NOT EXISTS customers (
  customer_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password_salthash VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS certificates (
  certificate_id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers,
  is_active BOOLEAN,
  private_key BYTEA NOT NULL,
  body BYTEA NOT NULL
);