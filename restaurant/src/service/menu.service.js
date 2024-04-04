const menuDal = require("../dal/menu.dal");
const restaurantDal = require("../dal/restaurant.dal");

const registerMenuService = async ({ client, category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id }) => {
    const isExist = await restaurantDal.findRestaurantById({ client, restaurant_id });
    if (isExist.rows) {
        const dal_result = await menuDal.createMenu({ client, category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id });
        return dal_result;
    }
    else {
        const err = new Error("Restaurant Not Exist")
        err.statusCode = 404;
        throw err
    }


}

const getMenuService = async ({ sort, sortBy, sortType, search, client, restaurant_id, category_id, sub_category_id, page }) => {
    
    const dal_result = await menuDal.getMenu({ sort, sortBy, sortType, search, client, restaurant_id, category_id, sub_category_id, page });
    return dal_result;


}

const getItemByID = async ({ client, menu_id }) => {
    const dal_result = await menuDal.getMenuID({ client, menu_id });
    return dal_result;
}

const updateMenuService = async ({ client, menu_id, category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id }) => {
    const isExist = await restaurantDal.findRestaurantById({ client, restaurant_id });
    if (isExist.rows) {
        const menu = await menuDal.getMenuByRestaurantID({ client, menu_id, restaurant_id })
        if (menu.rows.length == 1) {
            const dal_result = await menuDal.updateMenu({ client, category_id, dish_name, description, price, created_by, updated_by, sub_category_id, id })
            await menuDal.modifyUpdatedAt({ client, id });
            return dal_result
        }
        else {
            const err = new Error("Menu Not Found");
            err.statusCode = 404;
            throw err
        }
    } else {
        const err = new Error("Restaurant Not Exist")
        err.statusCode = 404;
        throw err
    }

}



const deleteMenuService = async ({ client, menu_id, ownerid }) => {

    const menu = await menuDal.getMenuID({ client, menu_id });

    if ((menu.rows[0] != null) && (ownerid == menu.rows[0].createdby)) {

        const dal_result = await menuDal.deleteMenu({ client, menu_id });
        return dal_result;
    }

    else {
        const err = new Error("Menu Not Found");
        err.statusCode = 404;
        throw err
    }

}

module.exports = { registerMenuService, getMenuService, updateMenuService, deleteMenuService, getItemByID };