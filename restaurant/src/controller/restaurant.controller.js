
const { registerService, getService, updateService, deleteService } = require("../service/restaurant.service");



const registerRestaurant = async (req, res, next) => {

  const { name, email, address, lat, long } = req.body
  const profile = req.file.filename;
  const created_by = req.user.id;
  const updated_by = req.user.id

  const restaurant = await registerService(name, email, profile, address, lat, long, created_by, updated_by)

  const myURL = new URL(`http://localhost:3001/foodApp/registerRestaurant/${req.file.filename}`);

  res.json(
    {
      message: "Restaurant Added Successfully",
      profile_url: myURL,
      restaurant: restaurant.rows[0]
    },
  )
};


const allRestaurant = async (req, res, next) => {

  const result = await getService()
  console.log(result.rows);
  res.json({ restaurants: result.rows })

}


const updateRestaurant = async (req, res, next) => {
  const { name, email, address, lat, long } = req.body
  const profile = req.file.filename;
  const updated_by = req.user.id
  const id = req.params.id
  const restaurant = await updateService(id, name, email, profile, address, lat, long, updated_by)

  res.json(
    {
      message: "Restaurant updated Successfully",
      restaurant: restaurant.rows[0]
    },)
}



const deleteRestaurant = async (req, res, next) => {

  const id = req.params.id
  const ownerid = req.user.id
  const result = await deleteService(id, ownerid);


  if (result) {
    return res.json("Deleted Successfully")
  }
  else {
    const err = new Error("you are not a owner");
    err.statuscode = 400;
    next(err);
  }
}



module.exports = { registerRestaurant, allRestaurant, updateRestaurant, deleteRestaurant }
