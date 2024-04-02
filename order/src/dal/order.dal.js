const pool = require("../config/db.config");



class orderDal {

    async createOrder({userid, restaurantid, total_amount}) {
        const sql = `INSERT INTO orders(userid, restaurantid, total_amount) VALUES ($1, $2, $3) RETURNING *`
        const values = [userid, restaurantid, total_amount]
        const result = await pool.query(sql, values);
        return result
    }
 
    async orderDetails({orderid, itemId, itemName, itemPrice}){
        const sql = `INSERT INTO orderitems(orderid, itemId, itemName, itemPrice) VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [orderid, itemId, itemName, itemPrice]
        const result = await pool.query(sql, values);
        return result
    }
  
}

module.exports = new orderDal();