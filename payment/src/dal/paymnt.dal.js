

class Payment {

    async createPayment({ client, orderId, razorpay_order_id }) {
        const sql = `INSERT INTO payment (orderid, razorpay_order_id) VALUES ($1, $2) RETURNING *`
        const values = [orderId, razorpay_order_id]
        const result = await client.query(sql, values);
        return result
    }

    async updatePayment({ client, orderId, razorpay_order_id, razorpay_payment_id, status }) {
        const sql = `UPDATE payment SET razorpay_payment_id = $1, orderid = $2, status = $3 WHERE razorpay_order_id= $4;`
        const values = [razorpay_payment_id, orderId, status,  razorpay_order_id]
        const result = await client.query(sql, values);
        return result
    }


}

module.exports = new Payment();  