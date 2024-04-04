
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
  
}

module.exports = new orderDal();