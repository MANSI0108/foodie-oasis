const menuDal = require("../dal/menu.dal");
const restaurantDal = require("../dal/restaurant.dal");

const handleMenuData = async (req, res, next) => {

    const { dish_name, description, price, restaurant_id, category_id, sub_category_id } = req.body
    const created_by = req.user.id;
    const updated_by = req.user.id

    if (!dish_name || !description || !restaurant_id || !category_id || !created_by || !updated_by || !sub_category_id || !price) {

        const err = new Error("Some fields are missing");
        err.statusCode = 400;
        next(err);
    }
    try {

        const res_id = await restaurantDal.findRestaurantById(restaurant_id);

        if (res_id.rows.length == 0) {
            const err = new Error("Restaurant Not Exist")
            err.statusCode = 401;
            return next(err)
        }
      next()
    }
    catch (err) {
        next(err)
    }

};

const menuExist = async(req,res,next)=>{

    const id = req.params.id;
    const menu = await menuDal.getMenuID(id);

    if(menu.rows.length == 0){
        const err = new Error("Menu Not Exist")
        err.statusCode = 401;
        return next(err)
    }
    next()
}
module.exports = { handleMenuData, menuExist }