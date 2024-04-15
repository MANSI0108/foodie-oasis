
class paymentDal {
    async createPayment({ client, orderid, razorpay_order_id }) {
        const sql = `INSERT INTO payment(orderid,razorpay_order_id) VALUES ($1, $2) RETURNING *`
        const values = [orderid, razorpay_order_id]
        const result = await client.query(sql, values);
        return result
    }

    async updatePayment({ client, razorpay_order_id, razorpay_payment_id, status }) {

        const sql = `UPDATE payment SET  razorpay_payment_id = $1, status = $2 WHERE razorpay_order_id= $3;`
        const values = [razorpay_payment_id, status, razorpay_order_id]
        const result = await client.query(sql, values);
        return result
    }




}

module.exports = new paymentDal();