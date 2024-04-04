const pool = require("../config/db.config");


class restaurantDal {
    async createRestaurant({ client, name, email, profile, address, lat, long, created_by, updated_by }) {
        const sql = `INSERT INTO restaurant(name, email, profile, address, lat, long, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8) RETURNING *`
        const values = [name, email, profile, address, lat, long, created_by, updated_by]
        const result = await client.query(sql, values);
        return result
    }

    async findRestaurantByEmail({ client, email }) {

        const sql = 'SELECT * FROM restaurant WHERE email = $1 '
        const values = [email]
        const result = await client.query(sql, values);
        return result
    }

    async getRestaurant({ client }) {

        const sql = 'SELECT * FROM restaurant'
        const result = await client.query(sql);
        return result
    }

    async updateRestaurant({ client, id, name, email, profile, address, lat, long, ownerId }) {
        const sql = `UPDATE restaurant SET name = $1, email = $2, profile = $3, address= $4, lat=$5, long=$6, updated_by=$7 WHERE id= $8;`
        const values = [name, email, profile, address, lat, long, ownerId, id]
        const result = await client.query(sql, values);
        return result
    }

    async deleteRestaurant({ client, id }) {

        const sql = 'delete from restaurant where id = $1 ';
        const values = [id];
        const result = await client.query(sql, values);
        return result
    }

    async findRestaurantById({ client, id }) {
        const sql = 'SELECT * FROM restaurant WHERE id  = $1 '
        const values = [id]
        const result = await client.query(sql, values);
        return result
    }

    async findRestaurantByItemId({ client, itemId }) {
        const sql = 'SELECT restaurant_id FROM restaurant_menu WHERE id=$1'
        const values = [itemId]
        const result = await client.query(sql, values);
        return result
    }

    async deleteRestaurantMenu({ client, restaurant_id }) {
        const sql = 'delete from restaurant_menu where restaurant_id = $1 ';
        const values = [restaurant_id];
        const result = await client.query(sql, values);
        return result
    }

    async menuExist({ client, restaurant_id }) {

        const sql = 'select * from restaurant_menu where restaurant_id = $1 ';
        const values = [restaurant_id];
        const result = await client.query(sql, values);
        return result
    }

}

module.exports = new restaurantDal();