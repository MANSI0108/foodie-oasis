const { client } = require("../../helper");

const { getRestaurant } = require("../services/apiCall.service");
const { orderData } = require("../services/order.service");



const orderDetails = async (req, res, next) => {
    const dbClient = req.client
    const userid = req.user.id
    const totalOrder = JSON.parse(await client.get(`user:${userid.toString()}`));
    let total_amount = 0;
    let item = [];
    let dishes = totalOrder.items 
    const l = dishes.length
    for (let i = 0; i < l; i++) {
        total_amount += (dishes[i].price * dishes[i].quantity)
        item.push(dishes[i])
    }

    const Result = { items: item }
    const items = Result.items

    //   internal api call using aixos for get Restaurant Id
    const token = req.headers["authorization"]
    const itemId = item[0].id 
    const restaurantid = await getRestaurant(itemId, token);
 
    // service call for store data in database with all items details
    const storeData = await orderData({ dbClient, items, userid, restaurantid, total_amount })

    if (storeData) res.json({ items, total_amount })
    else {
        next(err)
    }

}

module.exports = { orderDetails }

