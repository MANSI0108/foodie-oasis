-- migrate:up

CREATE TABLE IF NOT EXISTS userdata (
          id SERIAL PRIMARY KEY,
          username  VARCHAR(255),
          email  VARCHAR(255),
          password  VARCHAR(255),
          phone bigint 

        );
-- migrate:down

