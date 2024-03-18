const menuDal = require("../dal/menu.dal");
const restaurantDal = require("../dal/restaurant.dal");

const registerMenuService = async (category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id) => {

    const dal_result = await menuDal.createMenu(category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id);
    return dal_result;


}

const getMenuService = async(restaurant_id, category_id, sub_category_id)=>{

    const dal_result = await menuDal.getMenu_By_ID(restaurant_id, category_id, sub_category_id);
    return dal_result;
    

}

const updateMenuService = async(category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id)=>{

    const dal_result = await menuDal.updateMenu(category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id)
    await menuDal.modifyUpdatedAt(id);
    return dal_result

}

const deleteMenuService = async (id, ownerid) => {
    
    const menu = await menuDal.getMenuID(id);

    if ((menu.rows[0] != null) && (ownerid == menu.rows[0].createdby)) {

        const dal_result = await menuDal.deleteMenu(id);
        return dal_result;
    }

    else {
        return false;
    }

}

module.exports = {registerMenuService, getMenuService, updateMenuService, deleteMenuService};