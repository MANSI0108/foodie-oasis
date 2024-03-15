-- migrate:up
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone BIGINT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('customer', 'owner')) NOT NULL,
    isveryfied BOOL NOT NULL DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- migrate:down

