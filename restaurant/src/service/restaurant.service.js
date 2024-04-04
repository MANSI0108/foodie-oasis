const restaurantDal = require("../dal/restaurant.dal");


const registerService = async ({ client, name, email, profile, address, lat, long, created_by, updated_by }) => {

    const result = await restaurantDal.findRestaurantByEmail({ client, email });

    if (result.rows.length > 0) {
        const err = new Error("Restaurant is already exist")
        err.statusCode = 302;
        throw err
    }
    else {
        const dal_result = await restaurantDal.createRestaurant({ client, name, email, profile, address, lat, long, created_by, updated_by });
        return dal_result;

    }


}

const getService = async ({ client, sort, sortBy, sortType, search, page }) => {

    const dal_result = await restaurantDal.getRestaurant({ client, sort, sortBy, sortType, search, page})
    return dal_result

}


const updateService = async ({ client, id, name, email, profile, address, lat, long, ownerId }) => {

    const isExist = await restaurantDal.findRestaurantById({ client, id });
    if (isExist.rowCount) {

        const created_by = isExist.rows[0].created_by;

        if (created_by == ownerId) {
            const dal_result = await restaurantDal.updateRestaurant({ client, id, name, email, profile, address, lat, long, ownerId });
            return dal_result;
        }
        else {
            const err = new Error("You are not the owner of this restaurant")
            err.statusCode = 401
            throw err
        }

    }
    else {
        const err = new Error("Restuarant not Found")
        err.statusCode = 404
        throw err
    }

}

const deleteService = async ({ client, id, ownerId }) => {

    const restaurant = await restaurantDal.findRestaurantById({ client, id });
    const restaurant_id = restaurant.rows[0].id

    if (restaurant_id) {

        if (ownerId === restaurant.rows[0].created_by) {
            const isExist = await restaurantDal.menuExist({ client, restaurant_id })

            if (isExist.rowCount) {

                const ans = await restaurantDal.deleteRestaurantMenu({ client, restaurant_id })
                if (ans.rowCount) {
                    const dal_result = await restaurantDal.deleteRestaurant({ client, id });
                    return dal_result;
                }
            }
        }

        else {
            const err = new Error("You are not the owner of this restaurant")
            err.statusCode = 401
            throw err
        }
    }
    else {
        const err = new Error("Restaurant not found");
        err.statusCode = 404;
        throw err
    }

}

const getRestaurantIDService = async ({ client, itemId }) => {
    const restaurant = await restaurantDal.findRestaurantByItemId({ client, itemId });
    if (restaurant.rows[0]) {
        return restaurant;
    }
    else {
        return false
    }
}

module.exports = { registerService, getService, updateService, deleteService, getRestaurantIDService };