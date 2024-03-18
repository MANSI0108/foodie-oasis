const pool = require("../config/db.config");


class restaurantDal {
    async createRestaurant(name, email, profile, address, lat, long, created_by, updated_by) {
        const sql = `INSERT INTO restaurant(name, email, profile, address, lat, long, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8) RETURNING *`
        const values = [name, email, profile, address, lat, long, created_by, updated_by]
        const result = await pool.query(sql, values);
        return result
    }

    async findRestaurantByname(name) {
        
            
        const sql = 'SELECT * FROM restaurant WHERE username = $1'
        const values = [name]
        const result = await pool.query(sql, values);
        return result
        
   
    }

    async findRestaurantByEmail(email){

        const sql = 'SELECT * FROM restaurant WHERE email = $1 '
        const values = [ email]
        const result = await pool.query(sql, values);
        return result
    }

    // async findUserisverified(email){

    //     const sql = 'SELECT isveryfied FROM users WHERE email = $1 '
    //     const values = [ email]
    //     const result = await pool.query(sql, values);
    //     return result
    // }

    // async changeVerifiedStatus(user_id) {
    //     const sql = 'UPDATE users SET isveryfied = true WHERE id = $1;'
    //     const values = [user_id]
    //     const result = await pool.query(sql, values);
    //     return result
    // }

}

module.exports= new restaurantDal();