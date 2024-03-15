-- migrate:up
CREATE TABLE emailverificationToken(
    id SERIAL PRIMARY KEY,
    token VARCHAR(255),
    user_id serial, 
    CONSTRAINT fk_user  
    FOREIGN KEY(user_id)   
    REFERENCES users(id)  
);


-- migrate:down

