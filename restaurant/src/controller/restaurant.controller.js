const pool = require("../config/db.config");
const { registerService } = require("../service/restaurant.service");

const registerRestaurant = async (req, res, next) => {

  const client = await pool.connect();

  try {

    const { name, email, address, lat, long } = req.body
    const profile = req.file.filename;
    const created_by = req.user.id;
    const updated_by = req.user.id
    
    const restaurant = await registerService(name, email, profile, address, lat, long, created_by, updated_by)

    const myURL = new URL(`http://localhost:3001/foodApp/registerRestaurant/${req.file.filename}`);


    res.json(
      {
        message: "Restaurant Added Successfully",
        profile_url: myURL
      },
      restaurant.rows[0])




  } catch (err) {
    next(err)
  } finally {
    client.release()

  }
};

module.exports = registerRestaurant
