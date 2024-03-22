-- migrate:up

create table orders (
    id SERIAL PRIMARY KEY,
    userId SERIAL,
    menuId SERIAL,
    amount integer,
    cretedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
 );

-- migrate:down

DROP TABLE IF EXISTS orders