
const { registerService, getService, updateService, deleteService, getRestaurantIDService } = require("../service/restaurant.service");



const registerRestaurant = async (req, res, next) => {

  const client = req.client
  const { name, email, address, lat, long } = req.body
  const profile = req.file.filename;
  const created_by = req.user.id;
  const updated_by = req.user.id

  const restaurant = await registerService({ client, name, email, profile, address, lat, long, created_by, updated_by })

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

  const client = req.client
  const {sort, sortType, sortBy, search, page} = req.query
  
  const result = await getService({ client, sort, sortBy, sortType, search, page })
  res.json({ restaurants: result.rows })

}


const updateRestaurant = async (req, res, next) => {
  const client = req.client
  const { name, email, address, lat, long } = req.body
  const profile = req.file.filename;
  const ownerId = req.user.id
  const id = req.params.id
  const restaurant = await updateService({ client, id, name, email, profile, address, lat, long, ownerId })
  console.log(restaurant.rowCount);
  if (restaurant.rowCount) {
    res.json(
      {
        message: "Restaurant updated Successfully"
      })
  }
  else {
    const err = new Error("Something is Wrong")
    err.statusCode = 500
    throw err
  }
}




const deleteRestaurant = async (req, res, next) => {
  const client = req.client
  const id = req.params.id
  const ownerId = req.user.id
  const result = await deleteService({ client, id, ownerId });
  if (result.rowCount) {
    return res.json({message:"Deleted Successfully"})
  }
  else {
    const err = new Error("Somthing is Wrong");
    err.statusCode = 500;
    next(err);

  }
}

const getRestaurantID = async (req, res, next) => {

  const client = req.client
  const itemId = req.params.itemId
  const result = await getRestaurantIDService({ client, itemId });
  if (result) {
    return res.json(result.rows[0])
  }
  else {
    const err = new Error("Restaurant Not Found");
    err.statusCode = 404;
    next(err);
  }

}

module.exports = { registerRestaurant, allRestaurant, updateRestaurant, deleteRestaurant, getRestaurantID }
