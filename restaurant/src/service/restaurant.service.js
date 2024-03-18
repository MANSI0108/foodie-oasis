const restaurantDal = require("../dal/restaurant.dal");


const registerService = async (name, email, profile, address, lat, long, created_by, updated_by) => {

    const dal_result = await restaurantDal.createRestaurant(name, email, profile, address, lat, long, created_by, updated_by);
    return dal_result;
    

}

module.exports = {registerService};