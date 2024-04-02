
const { registerMenuService, getMenuService, updateMenuService, deleteMenuService, getItemByID } = require("../service/menu.service");




const registerMenu = async (req, res, next) => {

  const { dish_name, description, price, restaurant_id, category_id, sub_category_id } = req.body
  const created_by = req.user.id;
  const updated_by = req.user.id

  const restaurant_menu = await registerMenuService({ category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id })

  res.json(
    {
      message: "Menu Added Successfully",
      restaurant_menu: restaurant_menu.rows[0]
    },
  )

};


const getMenu = async function (req, res, next) {

  const { restaurant_id, category_id, sub_category_id } = req.body
  const result = await getMenuService({ restaurant_id, category_id, sub_category_id })
  req.menu = result.rows
  res.json({ Menu: result.rows })
}

const getMenuByID = async function(req,res,next){
  const menu_id = req.params.id
  
  const result = await getItemByID(menu_id)
  req.menu = result.rows
  res.json({Item : result.rows})

}
const updateMenu = async (req, res, next) => {

  const { dish_name, description, price, restaurant_id, category_id, sub_category_id } = req.body
  const created_by = req.user.id
  const updated_by = req.user.id
  const id = req.params.id
  const menu_id = req.params.id
  const updateMenu = await updateMenuService({ menu_id, category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id })

  if (updateMenu.rowCount == 1) {
    return res.json(
      {
        message: "Restaurant updated Successfully",
      })
  }

}



const deleteMenu = async (req, res, next) => {


  const id = req.params.id
  const ownerid = req.user.id

  const result = await deleteMenuService({ id, ownerid });

  if (result.rowCount == 1) {
    return res.json("Deleted Successfully")
  }
  else {
    const err = new Error("You are not a owner");
    err.statusCode = 401;
    next(err);
  }

}



module.exports = { registerMenu, getMenu, getMenuByID, updateMenu, deleteMenu }

