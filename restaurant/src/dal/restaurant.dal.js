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

    async findRestaurantByEmail(email) {

        const sql = 'SELECT * FROM restaurant WHERE email = $1 '
        const values = [email]
        const result = await pool.query(sql, values);
        return result
    }

    async getRestaurant() {

        const sql = 'SELECT * FROM restaurant'
        const result = await pool.query(sql);
        return result
    }

    async updateRestaurant(id, name, email, profile, address, lat, long, updated_by) {
        const sql = `UPDATE restaurant SET name = $1, email = $2, profile = $3, address= $4, lat=$5, long=$6, updated_by=$7 WHERE id= $8;`
        const values = [name, email, profile, address, lat, long, updated_by, id]
        const result = await pool.query(sql, values);
        return result
    }

    async deleteRestaurant(id) {

        const sql = 'delete from restaurant where id = $1 ';
        const values = [id];
        const result = await pool.query(sql, values);
        console.log(result);
        return result
    }

    async findRestaurantById(id) {

        const sql = 'SELECT * FROM restaurant WHERE id  = $1 '
        const values = [id]
        const result = await pool.query(sql, values);
        return result
    }

    async findRestaurantById_Name(created_by, name) {

        const sql = 'SELECT id FROM restaurant WHERE created_by  = $1 AND name = $2'
        const values = [created_by, name]
        const result = await pool.query(sql, values);
        return result
    }
   
    async findRestaurantByItemId(itemId){
        const sql = 'SELECT restaurant_id FROM restaurant_menu WHERE id=$1'
        const values = [itemId]
        const result = await pool.query(sql, values);
        return result
    }

}

module.exports = new restaurantDal();