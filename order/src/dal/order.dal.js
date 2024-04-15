
class orderDal {

    async createOrder({dbClient, userid, restaurantid, total_amount}) {
        const sql = `INSERT INTO orders(userid, restaurantid, total_amount) VALUES ($1, $2, $3) RETURNING *`
        const values = [userid, restaurantid, total_amount]
        const result = await dbClient.query(sql, values);
        return result
    }
 
    async orderDetails({dbClient, orderid, itemId, itemName, itemPrice}){
        const sql = `INSERT INTO orderitems(orderid, itemId, itemName, itemPrice) VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [orderid, itemId, itemName, itemPrice]
        const result = await dbClient.query(sql, values);
        return result
    }
  
    async updateOrder({client, orderid, razorpay_payment_id}){
        
        const sql = `UPDATE orders SET  razorpay_payment_id = $1 WHERE id = $2;`
        const values = [razorpay_payment_id, orderid]
        const result = await client.query(sql, values);
        return result

    }
}

module.exports = new orderDal();