-- migrate:up
CREATE TYPE type AS ENUM ('captured', 'failed', 'pending');
create table payment (
    id SERIAL PRIMARY KEY,
    razorpay_payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255),
    orderId integer ,
    status type DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
 );


-- migrate:down
DROP TABLE IF EXISTS payment; 

