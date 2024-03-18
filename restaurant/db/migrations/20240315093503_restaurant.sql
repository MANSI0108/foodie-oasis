

-- migrate:up

 create table restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    lat int,
    long int,
    created_by  SERIAL  NOT NULL,
    updated_by  SERIAL NOT NULL    
 )

-- migrate:down

DROP TABLE IF EXISTS restaurant;