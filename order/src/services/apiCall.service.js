const axios = require("axios")

const getItem = async (id, token) => {

    const menuId = id;


    const response = await axios.get(`http://127.0.0.1:3001/foodApp/menu/${menuId}`, {
        headers: {
            'Authorization': token
        }
    })

    const user = response.data;

    return user.Item[0]

}

const getRestaurant = async (itemId, token) => {

    const response = await axios.get(`http://127.0.0.1:3001/foodApp/restaurant/${itemId}`, {
        headers: {
            'Authorization': token
        }
    })

    const restaurantid = response.data.restaurant_id;

    return restaurantid

}
module.exports = { getItem, getRestaurant }  