-- migrate:up

create table orders (
    id SERIAL PRIMARY KEY,
    userId SERIAL NOT NULL,
    restaurantId SERIAL NOT NULL,
    total_amount integer NOT NULL,
    razorpay_payment_id VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
 );

create table orderItems(
    id SERIAL PRIMARY KEY,
    orderId SERIAL NOT NULL,
    itemId SERIAL NOT NULL,
    itemName VARCHAR(255) NOT NULL,
    itemPrice integer NOT NULL,
    CONSTRAINT fk_special
    FOREIGN KEY(orderId)   
    REFERENCES orders(id)
)
-- migrate:down
DROP TABLE IF EXISTS orderItems; 
DROP TABLE IF EXISTS orders;
