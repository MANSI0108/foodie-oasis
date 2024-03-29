-- migrate:up

create table orders (
    id SERIAL PRIMARY KEY,
    userId SERIAL,
    restaurantId SERIAL,
    total_amount integer,
    cretedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
 );

create table cart(
    id SERIAL PRIMARY KEY,
    dish VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity integer DEFAULT 1,
    cretedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy SERIAL
)
-- migrate:down

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart 