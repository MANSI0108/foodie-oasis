const handleMenuData = async (req, res, next) => {

    const { dish_name, description, price, restaurant_id, category_id, sub_category_id } = req.body
    const created_by = req.user.id;
    const updated_by = req.user.id

    if (!dish_name || !description || !restaurant_id || !category_id || !created_by || !updated_by || !sub_category_id || !price) {

        const err = new Error("Some fields are missing");
        err.statusCode = 400;
        next(err);
    }

    next()

};

module.exports = { handleMenuData }