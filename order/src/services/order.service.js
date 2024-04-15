const orderDal = require("../dal/order.dal");

// service call for store order details in database 

const orderData = async ({ dbClient, items, userid, restaurantid, total_amount }) => {
   let order
    if (items.length >= 1) {
         order = await orderDal.createOrder({ dbClient, userid, restaurantid, total_amount })
    
        if (order.rowCount) {

            for (const item of items) {
                const orderid = order.rows[0].id;
                const itemId = item.id;
                const itemName = item.dish_name
                const itemPrice = Number(item.price)

                await orderDal.orderDetails({ dbClient, orderid, itemId, itemName, itemPrice })

            }

        }
    }

    return order.rows[0].id;
}


const updateOrder = async({client,orderid,razorpay_payment_id}) =>{

    let update = await orderDal.updateOrder({client,orderid,razorpay_payment_id})

    return update.rowCount

}

module.exports = { orderData, updateOrder } 