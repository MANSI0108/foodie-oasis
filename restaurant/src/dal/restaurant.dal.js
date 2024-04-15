<<<<<<< HEAD



=======
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
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



    async getRestaurant({ client, sort, sortBy, sortType, search, page }) {
        const limit = 10
        const offset = (page - 1) * limit
        const str = 'SELECT* FROM restaurant'
        var sql = ""
        if (sort && search) {

            sql = str + ` WHERE name LIKE '${search}%' ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset} `

        }

        else if (sort) {
            sql = str + ` ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset} `

        }

        else if (search) {

            sql = str + ` WHERE name LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset} `

        }
        else {
            sql = str
        }
        const result = await client.query(sql);
        return result

    }

    async getRestaurantSortBy({ client, sortBy, sortType }) {
        const sql = `SELECT * FROM restaurant ORDER BY ${sortBy} ${sortType}`
        const result = await client.query(sql);
        return result
    }

    async getRestaurantBySearch({ client, search }) {
        const sql = `SELECT * FROM restaurant WHERE name LIKE '${search}%'`
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