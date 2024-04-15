-- migrate:up
create TYPE STATE as enum('pending', 'failed', 'captured');

create table payment (
    id SERIAL PRIMARY KEY,
    razorpay_payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255), 
    orderid integer NOT NULL,
    status STATE DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()  
 );

-- migrate:down
DROP TABLE IF EXISTS payment;
DROP TYPE IF EXISTS STATE;
