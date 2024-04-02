const { client } = require("../../helper");

const { getRestaurant } = require("../services/apiCall.service");
const { orderData } = require("../services/order.service");



const orderDetails = async (req, res, next) => {

    const userid = req.user.id
    const totalOrder = JSON.parse(await client.get(`user:${userid.toString()}`));
    const ob = totalOrder.items
    const keys = Object.keys(totalOrder.items);
    let total_amount = 0;

    let Result = { items: [] }

    for (const key of keys) {
        total_amount += (ob[key].price * ob[key].quantity)
        Result.items.push({ id: key, name: ob[key].dish_name, price: ob[key].price, quantity: ob[key].quantity })

    }

    const items = Result.items

    //   internal api call using aixos for get Restaurant Id
    const token = req.rawHeaders[1]
    const itemId = items[0].id
    const restaurantid = await getRestaurant(itemId, token);

    // service call for store data in database with all items details
    const storeData = await orderData({ items, userid, restaurantid, total_amount })

    if (storeData) res.json({ items, total_amount })
    else {
        next(err)
    }

}

module.exports = { orderDetails }

