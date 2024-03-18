
const pool = require("../config/db.config");
const { registerMenuService, getMenuService, updateMenuService, deleteMenuService } = require("../service/menu.service");




const registerMenu = async (req, res, next) => {
  const client = await pool.connect();

  try {

    const { dish_name, description, price, restaurant_id, category_id, sub_category_id } = req.body
    const created_by = req.user.id;
    const updated_by = req.user.id

    const restaurant_menu = await registerMenuService(category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id)
    console.log(restaurant_menu);

    res.json(
      {
        message: "Menu Added Successfully",
        restaurant_menu: restaurant_menu.rows[0]
      },
    )

  } catch (err) {
    next(err)
  } finally {
    client.release()

  }
};


const getMenu = async function (req, res, next) {

  const client = await pool.connect();

  try {

    const { restaurant_id, category_id, sub_category_id } = req.body
    const result = await getMenuService(restaurant_id, category_id, sub_category_id)

    res.json({ Menu: result.rows })

  } catch (error) {
    next(error)
  } finally {
    client.release()

  }
}


const updateMenu = async (req, res, next) => {
  const client = await pool.connect();

  try {

    const { dish_name, description, price, restaurant_id, category_id, sub_category_id } = req.body
    const created_by = req.user.id;
    const updated_by = req.user.id
    const id = req.params.id
    const updateMenu = await updateMenuService(category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id)
    
    if (updateMenu.rowCount == 1) {
      return res.json(
        {
          message: "Restaurant updated Successfully",
        })
    }



  } catch (error) {
    next(error)
  } finally {
    client.release()

  }
}



const deleteMenu = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const id = req.params.id
    const ownerid = req.user.id
    const result = await deleteMenuService(id, ownerid);
    
    if (result.rowCount==1) {
      return res.json("Deleted Successfully")
    }
    else {
      const err = new Error("you are not a owner");
      err.statuscode = 400;
      next(err);
    }

  } catch (error) {
    next(error)
  } finally {
    client.release()

  }
}



module.exports = { registerMenu, getMenu, updateMenu, deleteMenu }

