const orderDal = require("../dal/order.dal");

// service call for store order details in database 

const orderData = async ({ dbClient, items, userid, restaurantid, total_amount }) => {

    if (items.length >= 1) {
        const order = await orderDal.createOrder({ dbClient, userid, restaurantid, total_amount })
        if (order.rowCount) {

            for (const item of items) {
                const orderid = order.rows[0].id;
                const itemId = item.id;
                const itemName = item.name
                const itemPrice = Number(item.price)

                await orderDal.orderDetails({ dbClient, orderid, itemId, itemName, itemPrice })

            }

        }
    }

    return true;
}

module.exports = { orderData }