const restaurantDal = require("../dal/restaurant.dal");


const registerService = async (name, email, profile, address, lat, long, created_by, updated_by) => {

    const dal_result = await restaurantDal.createRestaurant(name, email, profile, address, lat, long, created_by, updated_by);
    return dal_result;


}

const getService = async () => {

    const dal_result = await restaurantDal.getRestaurant();
    return dal_result;
}


const updateService = async (id, name, email, profile, address, lat, long, updated_by) => {

    const dal_result = await restaurantDal.updateRestaurant(id, name, email, profile, address, lat, long, updated_by);
    return dal_result;
}

const deleteService = async (id, ownerid) => {

    const restaurant = await restaurantDal.findRestaurantById(id);

    if ((restaurant.rows[0] != null) && (ownerid === restaurant.rows[0].created_by)) {
        const ans = await restaurantDal.deleteRestaurantMenu(restaurant.rows[0].id)
        if (ans.rowCount) {
            const dal_result = await restaurantDal.deleteRestaurant(id);
            return dal_result;
        }

    }

    else {
        const err = new Error("Restaurant not found");
        err.statusCode = 404;
        throw err
    }

}

const getRestaurantIDService = async (itemId) => {
    const restaurant = await restaurantDal.findRestaurantByItemId(itemId);
    if (restaurant.rows[0]) {
        return restaurant;
    }
    else {
        return false
    }
}

module.exports = { registerService, getService, updateService, deleteService, getRestaurantIDService };