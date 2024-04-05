const axios = require("axios")

const getItem = async (id, token) => {

    const menuId = id;


    const response = await axios.get(`${process.env.INTERNAL_API_MENU} ${menuId}`, {
        headers: {
            'Authorization': token
        }
    })

    const user = response.data;
 
    return user.Item[0]

}

const getRestaurant = async (itemId, token) => {

    const response = await axios.get(`${process.env.INTERNAL_API_RESTAURANT} ${itemId}`, {
        headers: {
            'Authorization': token
        }
    })

    const restaurantid = response.data.restaurant_id;

    return restaurantid

}
module.exports = { getItem, getRestaurant }  